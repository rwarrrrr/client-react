declare module 'react-bootstrap-table-next' {
    import { ComponentType } from 'react';
  
    type ColumnDescription = {
      dataField: string;
      text: string;
      sort?: boolean;
      formatter?: (cell: any, row: any, rowIndex: number, formatExtraData: any) => React.ReactNode;
      filter?: any;
      editor?: any;
      editable?: boolean;
      headerStyle?: React.CSSProperties;
    };
  
    interface BootstrapTableProps {
      keyField: string;
      data: any[];
      columns: ColumnDescription[];
      pagination?: any;
      filter?: any;
      cellEdit?: any;
      overlay?: any;
    }
  
    const BootstrapTable: ComponentType<BootstrapTableProps>;
  
    export default BootstrapTable;
  }
  
  declare module 'react-bootstrap-table2-paginator' {
    import { ComponentType } from 'react';
  
    const paginationFactory: (options?: any) => any;
  
    export default paginationFactory;
  }
  
  // Add similar declarations for other sub-modules as needed
  