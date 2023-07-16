type cellFunction = ({ value }: { value: any }) => string;

interface columnsArray {
  [index: string]: string | boolean | undefined | cellFunction;
}

interface dataArray {
  [index: string]: string;
}

export interface DataTableProps {
  columns: columnsArray[];
  data: dataArray[];
  sortable?: boolean;
  filterable?: boolean;
  pagination?: boolean;
  caption?: string;
}
