interface Datas {
    label: string,
    id?: number | string,
    icon?: string,
    url?: string;
    disabled?: boolean;
}

interface TabMenuChangeEvent {
  value: Datas;
  index: number;
  originalEvent: React.SyntheticEvent;
}

export interface TabMenuProps {
    data: Datas[];
    id?: number;
    className?: string;
    activiedIndex?: number;
    scrollable?: boolean;
    onTabChange?(e: TabMenuChangeEvent): void;
}


export interface TabPanelProps {

}


export interface TabProps {
  children: React.ReactNode;
  scrollable?: boolean;
  activiedIndex?: number;
  onTabChange?(e: TabMenuChangeEvent): void;
}


export interface TabPanelProps extends Datas {
  children: React.ReactNode;
}

