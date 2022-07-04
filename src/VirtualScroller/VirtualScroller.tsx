import * as React from 'react';
import { useMountEffect, usePrevious, useUpdateEffect } from '../hooks/index';
import type { VirtualScrollerProps } from '../types/VirtualScroller';
import ObjectUtils from '../utils/ObjectUtils';
import { getPrefix } from '../utils';
import classNames from 'classnames';
import './VirtualScroller.less';
type RowColType = { rows: number, cols: number };
type RowColState = RowColType | number;
const VirtualScroller = React.memo(React.forwardRef((props: VirtualScrollerProps, ref) => {
  const vertical = props.orientation === 'vertical';
  const horizontal = props.orientation === 'horizontal';
  const both = props.orientation === 'both';
  const [firstState, setFirstState] = React.useState<RowColState>(both ? { rows: 0, cols: 0 } : 0);
  const [lastState, setLastState] = React.useState<RowColState>(both ? { rows: 0, cols: 0 } : 0);
  const [numItemsInViewportState, setNumItemsInViewportState] = React.useState<RowColState>(both ? { rows: 0, cols: 0 } : 0);
  const [numToleratedItemsState, setNumToleratedItemsState] = React.useState(props.numToleratedItems);
  const [loadingState, setLoadingState] = React.useState(props.loading);
  const [loaderArrState, setLoaderArrState] = React.useState([]);
  const elementRef = React.useRef(null);
  const contentRef = React.useRef(null);
  const spacerRef = React.useRef(null);
  const stickyRef = React.useRef(null);
  const lastScrollPos = React.useRef(both ? { top: 0, left: 0 } : 0);
  const scrollTimeout = React.useRef(null);
  const prevItems = usePrevious(props.items);
  const prevLoading = usePrevious(props.loading);

  const scrollTo = (options) => {
    elementRef.current && elementRef.current.scrollTo(options);
  }

  const scrollToIndex = (index, behavior = 'auto') => {
    const { numToleratedItems } = calculateNumItems();
    const itemSize = props.itemSize;
    const contentPos = getContentPosition();
    const calculateFirst = (_index = 0, _numT) => (_index <= _numT ? 0 : _index);
    const calculateCoord = (_first, _size, _cpos) => (_first * _size) + _cpos;
    const scrollToItem = (left = 0, top = 0) => scrollTo({ left, top, behavior });
    if (both) {
      const _firstState = firstState as RowColType
      const newFirst = { rows: calculateFirst(index[0], numToleratedItems[0]), cols: calculateFirst(index[1], numToleratedItems[1]) };
      if (newFirst.rows !== _firstState.rows || newFirst.cols !== _firstState.cols) {
        scrollToItem(calculateCoord(newFirst.cols, itemSize[1], contentPos.left), calculateCoord(newFirst.rows, itemSize[0], contentPos.top));
        setFirstState(newFirst);
      }
    }
    else {
      const newFirst = calculateFirst(index, numToleratedItems);

      if (newFirst !== firstState) {
        horizontal ? scrollToItem(calculateCoord(newFirst, itemSize, contentPos.left), 0) : scrollToItem(0, calculateCoord(newFirst, itemSize, contentPos.top));
        setFirstState(newFirst);
      }
    }
  }

  const scrollInView = (index, to, behavior = 'auto') => {
    if (to) {
      const { first, viewport } = getRenderedRange();
      const itemSize = props.itemSize || 0;
      const scrollToItem = (left = 0, top = 0) => scrollTo({ left, top, behavior });
      const isToStart = to === 'to-start';
      const isToEnd = to === 'to-end';

      if (isToStart) {
        if (both) {
          if ((viewport.first as RowColType).rows - (first as RowColType).rows > index[0]) {
            scrollToItem((viewport.first as RowColType).cols * Number(itemSize), ((viewport.first as RowColType).rows - 1) *  Number(itemSize));
          }
          else if ((viewport.first as RowColType).cols - (first as RowColType).cols > index[1]) {
            scrollToItem(((viewport.first as RowColType).cols - 1) * Number(itemSize), (viewport.first as RowColType).rows * Number(itemSize));
          }
        }
        else {
          if ((viewport.first as number) - (first as number) > index) {
            const pos = (viewport.first as number) * Number(itemSize);
            horizontal ? scrollToItem(pos, 0) : scrollToItem(0, pos);
          }
        }
      }
      else if (isToEnd) {
        if (both) {
          const _viewportLast = viewport.last as RowColType;
          const _viewportFirst = viewport.first as RowColType;
          if (_viewportLast.rows - _viewportFirst.rows <= index[0] + 1) {
            scrollToItem((viewport.first as RowColType).cols * Number(itemSize), (_viewportFirst.rows + 1) * Number(itemSize));
          }
          else if (_viewportLast.cols - _viewportFirst.cols <= index[1] + 1) {
            scrollToItem(((viewport.first as RowColType).cols + 1) * Number(itemSize), _viewportFirst.rows * Number(itemSize));
          }
        }
        else {
          const _viewportFirst = viewport.first as number;
          const _viewportLast = viewport.last as number;
          if (_viewportLast - Number(first) <= index + 1) {
            const pos = (_viewportFirst + 1) * Number(itemSize);
            horizontal ? scrollToItem(pos, 0) : scrollToItem(0, pos);
          }
        }
      }
    }
    else {
      scrollToIndex(index, behavior);
    }
  }

  const getRows = () => {
    return loadingState ? (props.loaderDisabled ? loaderArrState : []) : loadedItems();
  }

  const getColumns = () => {
    if (props.columns) {
      if (both || horizontal) {
        return loadingState && props.loaderDisabled ?
          (both ? loaderArrState[0] : loaderArrState) :
          props.columns.slice((both ? (firstState as RowColType).cols : firstState), (both ? (lastState as RowColType).cols : lastState));
      }
    }

    return props.columns;
  }

  const getRenderedRange = (): { first: RowColState, last: RowColState, viewport: { first: RowColState, last: RowColState }} => {
    const itemSize = props.itemSize;
    const calculateFirstInViewport = (_pos, _size) => Math.floor(_pos / (_size || _pos));

    let firstInViewport = firstState;
    let lastInViewport: RowColState = 0;

    if (elementRef.current) {
      const scrollTop = elementRef.current.scrollTop;
      const scrollLeft = elementRef.current.scrollLeft;

      if (both) {
        firstInViewport = { rows: calculateFirstInViewport(scrollTop, itemSize[0]), cols: calculateFirstInViewport(scrollLeft, itemSize[1]) };
        lastInViewport = { rows: firstInViewport.rows + (numItemsInViewportState as RowColType).rows, cols: firstInViewport.cols + (numItemsInViewportState as RowColType).cols };
      }
      else {
        const scrollPos = horizontal ? scrollLeft : scrollTop;
        firstInViewport = calculateFirstInViewport(scrollPos, itemSize);
        lastInViewport = firstInViewport + Number(numItemsInViewportState);
      }
    }

    return {
      first: firstState,
      last: lastState,
      viewport: {
        first: firstInViewport,
        last: lastInViewport
      }
    }
  }

  const calculateNumItems = () => {
    const itemSize = props.itemSize;
    const contentPos = getContentPosition();
    const contentWidth = elementRef.current ? elementRef.current.offsetWidth - contentPos.left : 0;
    const contentHeight = elementRef.current ? elementRef.current.offsetHeight - contentPos.top : 0;
    const calculateNumItemsInViewport = (_contentSize, _itemSize) => Math.ceil(_contentSize / (_itemSize || _contentSize));
    const calculateNumToleratedItems = (_numItems) => Math.ceil(_numItems / 2);
    const numItemsInViewport = both ?
      { rows: calculateNumItemsInViewport(contentHeight, itemSize[0]), cols: calculateNumItemsInViewport(contentWidth, itemSize[1]) } :
      calculateNumItemsInViewport((horizontal ? contentWidth : contentHeight), itemSize);

    const numToleratedItems = numToleratedItemsState || (both ?
      [calculateNumToleratedItems((numItemsInViewport as RowColType).rows), calculateNumToleratedItems((numItemsInViewport as RowColType).cols)] :
      calculateNumToleratedItems(numItemsInViewport));

    return { numItemsInViewport, numToleratedItems };
  }

  const calculateOptions = () => {
    const { numItemsInViewport, numToleratedItems } = calculateNumItems();
    const calculateLast = (_first, _num, _numT, _isCols?) => getLast(_first + _num + ((_first < _numT ? 2 : 3) * _numT), _isCols);
    const last = both ?
    { rows: calculateLast((firstState as RowColType).rows, (numItemsInViewport as RowColType).rows, numToleratedItems[0]), cols: calculateLast((firstState as RowColType).cols, (numItemsInViewport as RowColType).cols, numToleratedItems[1], true) } :
    calculateLast(firstState, numItemsInViewport, numToleratedItems);
    setNumItemsInViewportState(numItemsInViewport);
    setNumToleratedItemsState(numToleratedItems as number);
    setLastState(last);

    if (props.showLoader) {
      setLoaderArrState(both ?
        Array.from({ length: (numItemsInViewport as RowColType).rows }).map(() => Array.from({ length: (numItemsInViewport as RowColType).cols })) :
        Array.from({ length: numItemsInViewport } as any));
    }

    if (props.lazy) {
      props.onLazyLoad && props.onLazyLoad({ first: firstState, last });
    }
  }

  const getLast = (last = 0, isCols) => {
    if (props.items) {
      return Math.min((isCols ? (props.columns || props.items[0]).length : props.items.length), last);
    }

    return 0;
  }

  const getContentPosition = () => {
    if (contentRef.current) {
      const style = getComputedStyle(contentRef.current);
      const left = parseInt(style.paddingLeft, 10) + Math.max(parseInt(style.left, 10), 0);
      const right = parseInt(style.paddingRight, 10) + Math.max(parseInt(style.right, 10), 0);
      const top = parseInt(style.paddingTop, 10) + Math.max(parseInt(style.top, 10), 0);
      const bottom = parseInt(style.paddingBottom, 10) + Math.max(parseInt(style.bottom, 10), 0);

      return { left, right, top, bottom, x: left + right, y: top + bottom };
    }

    return { left: 0, right: 0, top: 0, bottom: 0, x: 0, y: 0 };
  }

  const setSize = () => {
    if (elementRef.current) {
      const parentElement = elementRef.current.parentElement;
      const width = props.scrollWidth || `${(elementRef.current.offsetWidth || parentElement.offsetWidth)}px`;
      const height = props.scrollHeight || `${(elementRef.current.offsetHeight || parentElement.offsetHeight)}px`;
      const setProp = (_name, _value) => elementRef.current.style[_name] = _value;

      if (both || horizontal) {
        setProp('height', height);
        setProp('width', width);
      }
      else {
        setProp('height', height);
      }
    }
  }

  const setSpacerSize = () => {
    const items = props.items;

    if (spacerRef.current && items) {
      const itemSize = props.itemSize;
      const contentPos = getContentPosition();
      const setProp = (_name, _value, _size, _cpos = 0) => spacerRef.current.style[_name] = (((_value || []).length * _size) + _cpos) + 'px';

      if (both) {
        setProp('height', items, itemSize[0], contentPos.y);
        setProp('width', (props.columns || items[1]), itemSize[1], contentPos.x);
      }
      else {
        horizontal ? setProp('width', (props.columns || items), itemSize, contentPos.x) : setProp('height', items, itemSize, contentPos.y);
      }
    }
  }

  const setContentPosition = (pos) => {
    if (contentRef.current) {
      const first = pos ? pos.first : firstState;
      const itemSize = props.itemSize;
      const calculateTranslateVal = (_first, _size) => (_first * _size);
      const setTransform = (_x = 0, _y = 0) => {
        stickyRef.current && (stickyRef.current.style.top = `-${_y}px`);
        contentRef.current.style.transform = `translate3d(${_x}px, ${_y}px, 0)`;
      };

      if (both) {
        setTransform(calculateTranslateVal(first.cols, itemSize[1]), calculateTranslateVal(first.rows, itemSize[0]));
      }
      else {
        const translateVal = calculateTranslateVal(first, itemSize);
        horizontal ? setTransform(translateVal, 0) : setTransform(0, translateVal);
      }
    }
  }

  const onScrollPositionChange = (event) => {
    event.persist();
    const target = event.target;
    const itemSize = props.itemSize;
    const contentPos = getContentPosition();
    const calculateScrollPos = (_pos, _cpos) => _pos ? (_pos > _cpos ? _pos - _cpos : _pos) : 0;
    const calculateCurrentIndex = (_pos, _size) => Math.floor(_pos / (_size || _pos));
    const calculateTriggerIndex = (_currentIndex, _first, _last, _num, _numT, _isScrollDownOrRight) => {
      return (_currentIndex <= _numT ? _numT : (_isScrollDownOrRight ? (_last - _num - _numT) : (_first + _numT - 1)))
    };
    const calculateFirst = (_currentIndex, _triggerIndex, _first, _last, _num, _numT, _isScrollDownOrRight) => {
      if (_currentIndex <= _numT)
        return 0;
      else
        return Math.max(0, _isScrollDownOrRight ?
          (_currentIndex < _triggerIndex ? _first : _currentIndex - _numT) :
          (_currentIndex > _triggerIndex ? _first : _currentIndex - (2 * _numT)));
    };
    const calculateLast = (_currentIndex, _first, _last, _num, _numT, _isCols?) => {
      let lastValue = _first + _num + (2 * _numT);

      if (_currentIndex >= _numT) {
        lastValue += (_numT + 1);
      }

      return getLast(lastValue, _isCols);
    };

    const scrollTop = calculateScrollPos(target.scrollTop, contentPos.top);
    const scrollLeft = calculateScrollPos(target.scrollLeft, contentPos.left);

    let newFirst: RowColState = 0;
    let newLast = lastState;
    let isRangeChanged = false;

    if (both) {
      const isScrollDown = (lastScrollPos.current as { top: number, left: number }).top <= scrollTop;
      const isScrollRight =  (lastScrollPos.current as { top: number, left: number }).left <= scrollLeft;
      const currentIndex = { rows: calculateCurrentIndex(scrollTop, itemSize[0]), cols: calculateCurrentIndex(scrollLeft, itemSize[1]) };
      const _firstState = firstState as RowColType;
      const _lastState = lastState as RowColType;
      const _numItemsInViewportState = numItemsInViewportState as RowColType;
      const triggerIndex = {
        rows: calculateTriggerIndex(currentIndex.rows, _firstState.rows, _lastState.rows, _numItemsInViewportState.rows, numToleratedItemsState[0], isScrollDown),
        cols: calculateTriggerIndex(currentIndex.cols, _firstState.cols, _lastState.cols, _numItemsInViewportState.cols, numToleratedItemsState[1], isScrollRight)
      };

      newFirst = {
        rows: calculateFirst(currentIndex.rows, triggerIndex.rows, _firstState.rows, _lastState.rows, _numItemsInViewportState.rows, numToleratedItemsState[0], isScrollDown),
        cols: calculateFirst(currentIndex.cols, triggerIndex.cols, _firstState.cols, _lastState.cols, _numItemsInViewportState.cols, numToleratedItemsState[1], isScrollRight)
      } as RowColType;
      newLast = {
        rows: calculateLast(currentIndex.rows, newFirst.rows, _lastState.rows, _numItemsInViewportState.rows, numToleratedItemsState[0]),
        cols: calculateLast(currentIndex.cols, newFirst.cols, _lastState.cols, _numItemsInViewportState.cols, numToleratedItemsState[1], true)
      };

      isRangeChanged = (newFirst.rows !== _firstState.rows && newLast.rows !== _lastState.rows) || (newFirst.cols !== _firstState.cols && newLast.cols !== _lastState.cols);

      lastScrollPos.current = { top: scrollTop, left: scrollLeft };
    }
    else {
      const scrollPos = horizontal ? scrollLeft : scrollTop;
      const isScrollDownOrRight = lastScrollPos.current <= scrollPos;
      const currentIndex = calculateCurrentIndex(scrollPos, itemSize);
      const triggerIndex = calculateTriggerIndex(currentIndex, firstState, lastState, numItemsInViewportState, numToleratedItemsState, isScrollDownOrRight);

      newFirst = calculateFirst(currentIndex, triggerIndex, firstState, lastState, numItemsInViewportState, numToleratedItemsState, isScrollDownOrRight);
      newLast = calculateLast(currentIndex, newFirst, lastState, numItemsInViewportState, numToleratedItemsState);
      isRangeChanged = newFirst !== firstState && newLast !== lastState;

      lastScrollPos.current = scrollPos;
    }

    return {
      first: newFirst,
      last: newLast,
      isRangeChanged
    }
  }

  const onScrollChange = (event) => {
    const { first, last, isRangeChanged } = onScrollPositionChange(event);
    if (isRangeChanged) {
      const newState = { first, last };

      setContentPosition(newState);

      setFirstState(first);
      setLastState(last);

      props.onScrollIndexChange && props.onScrollIndexChange(newState);

      if (props.lazy) {
        props.onLazyLoad && props.onLazyLoad(newState);
      }
    }
  }

  const onScroll = (event) => {
    event.persist();

    props.onScroll && props.onScroll(event);

    if (props.delay) {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      if (!loadingState && props.showLoader) {
        const { isRangeChanged: changed } = onScrollPositionChange(event);
        changed && setLoadingState(true);
      }

      scrollTimeout.current = setTimeout(() => {
        onScrollChange(event);

        if (loadingState && props.showLoader && !props.lazy) {
          setLoadingState(false);
        }
      }, props.delay);
    }
    else {
      onScrollChange(event);
    }
  }

  const getOptions = (renderedIndex) => {
    const first = firstState;
    const count = (props.items || []).length;
    const index = both ? (first as RowColType).rows + renderedIndex : first + renderedIndex;

    return {
      index,
      count,
      first: index === 0,
      last: index === (count - 1),
      even: index % 2 === 0,
      odd: index % 2 !== 0,
      props
    }
  }

  const loaderOptions = (index, extOptions) => {
    const count = loaderArrState.length;

    return {
      index,
      count,
      first: index === 0,
      last: index === (count - 1),
      even: index % 2 === 0,
      odd: index % 2 !== 0,
      props,
      ...extOptions
    }
  }

  const loadedItems = () => {
    const items = props.items;
    if (items && !loadingState) {
      if (both)
        return items.slice((firstState as RowColType).rows, (lastState as RowColType).rows).map(item => props.columns ? item : item.slice((firstState  as RowColType).cols, (lastState as RowColType).cols));
      else if (horizontal && props.columns)
        return items;
      else
        return items.slice(firstState as number, lastState as number);
    }

    return [];
  }

  const init = () => {
    setSize();
    calculateOptions();
    setSpacerSize();
  }

  useMountEffect(() => {
    init();
  });

  useUpdateEffect(() => {
    init();
  }, [props.itemSize, props.scrollHeight]);

  useUpdateEffect(() => {
    if ((!prevItems || prevItems.length !== (props.items || []).length)) {
      init();
    }
    if (props.lazy && prevLoading !== props.loading && props.loading !== loadingState) {
      setLoadingState(props.loading);
    }
  });

  useUpdateEffect(() => {
    lastScrollPos.current = both ? { top: 0, left: 0 } : 0;
  }, [props.orientation]);

  React.useImperativeHandle(ref, () => ({
    scrollTo,
    scrollToIndex,
    scrollInView,
    getRenderedRange
  }));

  const createLoaderItem = (index, extOptions = {}) => {
    const options = loaderOptions(index, extOptions);
    const content = ObjectUtils.getJSXElement(props.loadingTemplate, options);

    return (
      <React.Fragment key={index}>
        {content}
      </React.Fragment>
    )
  }

  const createLoader = () => {
    if (!props.loaderDisabled && props.showLoader && loadingState) {
      const className = classNames(getPrefix('virtualscroller-loader'), {
        [getPrefix('component-overlay')]: !props.loadingTemplate
      });

      let content: React.ReactNode = <i className="p-virtualscroller-loading-icon pi pi-spinner pi-spin"></i>;

      if (props.loadingTemplate) {
        content = loaderArrState.map((_, index) => {
          return createLoaderItem(index, both && { numCols: (numItemsInViewportState as RowColType).cols });
        });
      }

      return (
        <div className={className}>
          {content}
        </div>
      )
    }

    return null;
  }

  const createSpacer = () => {
    if (props.showSpacer) {
      return <div ref={spacerRef} className={getPrefix('virtualscroller-spacer')}></div>
    }

    return null;
  }

  const createItem = (item, index) => {
    const options = getOptions(index);
    const content = ObjectUtils.getJSXElement(props.itemTemplate, item, options);

    return (
      <React.Fragment key={options.index}>
        {content}
      </React.Fragment>
    )
  }

  const createItems = () => {
    const items = loadedItems();

    return items.map(createItem);
  }
  const createContent = () => {
    const items = createItems();
    
    const className = classNames(getPrefix('virtualscroller-container') , { [getPrefix('virtualscroller-loading')]: loadingState });
    const content = (
      <div ref={contentRef} className={className}>
        {items}
      </div>
    )

    if (props.contentTemplate) {
      const defaultOptions = {
        className,
        contentRef: (el) => contentRef.current = ObjectUtils.getRefElement(el),
        spacerRef: (el) => spacerRef.current = ObjectUtils.getRefElement(el),
        stickyRef: (el) => stickyRef.current = ObjectUtils.getRefElement(el),
        items: loadedItems,
        getItemOptions: (index) => getOptions(index),
        children: items,
        element: content,
        props,
        loading: loadingState,
        getLoaderOptions: (index, ext) => loaderOptions(index, ext),
        loadingTemplate: props.loadingTemplate,
        itemSize: props.itemSize,
        rows: getRows(),
        columns: getColumns(),
        vertical,
        horizontal,
        both
      }

      return ObjectUtils.getJSXElement(props.contentTemplate, defaultOptions);
    }

    return content;
  }

  if (props.disabled) {
    const content = ObjectUtils.getJSXElement(props.contentTemplate, { items: props.items, rows: props.items, columns: props.columns });

    return (
      <React.Fragment>
        {props.children}
        {content}
      </React.Fragment>
    )
  }
  else {
    const otherProps = ObjectUtils.findDiffKeys(props, (VirtualScroller as { [key:string]: any}).defaultProps);
    const className = classNames(getPrefix('virtualscroller'), {
      [getPrefix('both-scroll')]: both,
      [getPrefix('horizontal-scroll')]: horizontal,
    }, props.className);

    const loader = createLoader();
    const content = createContent();
    const spacer = createSpacer();

    return (
      <div ref={elementRef} className={className} tabIndex={0} style={props.style} {...otherProps} onScroll={(event) => onScroll(event)}>
        {content}
        {spacer}
        {loader}
      </div>
    )
  }
}));

VirtualScroller.displayName = 'VirtualScroller';
(VirtualScroller as { [key:string]: any}).defaultProps = {
  id: null,
  style: null,
  className: null,
  items: null,
  itemSize: 0,
  scrollHeight: null,
  scrollWidth: null,
  orientation: 'vertical',
  numToleratedItems: null,
  delay: 0,
  lazy: false,
  disabled: false,
  loaderDisabled: false,
  columns: null,
  loading: false,
  showSpacer: true,
  showLoader: false,
  loadingTemplate: null,
  itemTemplate: null,
  contentTemplate: null,
  onScroll: null,
  onScrollIndexChange: null,
  onLazyLoad: null
}


export default VirtualScroller;

export {
  VirtualScrollerProps
}