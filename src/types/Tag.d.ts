export interface TagProps {
  children?: React.ReactChild;
  type?: TagType,
  className?: string,
  dots?: boolean,
  style?: { [key: string]: string; }
  onClick?: () => void;
}

export type TagType = 'primary' | 'warning' | 'stop' | 'error' | 'success';