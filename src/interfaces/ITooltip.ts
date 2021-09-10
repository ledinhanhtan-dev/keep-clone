export interface ITooltip {
  show: boolean;
  title: string;
  top: number;
  left: number;
}

export const EMPTY_TOOLTIP: ITooltip = {
  show: false,
  title: '',
  top: 0,
  left: 0,
};
