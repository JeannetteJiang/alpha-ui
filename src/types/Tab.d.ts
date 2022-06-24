interface Datas {
    label: string,
    id?: number,
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
    onTabChange?(e: TabMenuChangeEvent): void;
}