import React, { useMemo } from 'react';
import classnames from 'classnames';
import { getPrefix } from '../utils';
import type { UploadProps } from '../types/Upload';
import Icon from '../Icon';
import './Upload.less';


enum UploadText {
  mainText = '点击此区域或拖放文件以上传',
  subText = '支持PDF, jpeg, jpg, png，单个文件最大支持25MB',
  uploadfailed = '上传失败！请重试',
  uploading = '上传中...',
  buttonText = '上传文件'
}

const Upload = (props: UploadProps) => {
  const { type = 'button', size = 'large' } = props;
  const UploadProps = props;
  const classes = classnames(getPrefix('upload'));

  const handleButtonUploadView = (): React.ReactNode => {
    return <div className={getPrefix('button-upload-container')}>

    </div>
  }

  const handleButtonDragView = (): React.ReactNode => {
    return <div className={classnames(getPrefix('drag-upload-container'), [size]) }>
        {size === 'large' && <Icon color='#A8C3FC' name='shangchuan' size={40} />}
        {size === 'large' && <Icon color='#CCCCCC' name='failed' size={40} />}
        <div className={'maintext'}>{UploadText.mainText}</div>
        <div className={'uploadfailed'}>{UploadText.uploadfailed}</div>
        <div className={'subtext'}>{UploadText.subText}</div>
    </div>
  }



  const renderView = useMemo(() => {
    if (type === 'drag') {
      return handleButtonDragView();
    } 
    return handleButtonUploadView();
  }, [type, size])

  return <div className={classes}>
    {renderView}
  </div>
};

export default Upload

export {
  UploadProps,
}