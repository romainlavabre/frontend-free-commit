export const GRID_DEFAULT_LOCALE_TEXT = {
    // Root
    noRowsLabel: 'Aucune donnée',
    noResultsOverlayLabel: 'Aucun resultat',

    // Density selector toolbar button text
    toolbarDensity: 'Densité',
    toolbarDensityLabel: 'Densité',
    toolbarDensityCompact: 'Compacte',
    toolbarDensityStandard: 'Standard',
    toolbarDensityComfortable: 'Confortable',

    // Columns selector toolbar button text
    toolbarColumns: 'Colonnes',
    toolbarColumnsLabel: 'Select columns',

    // Filters toolbar button text
    toolbarFilters: 'Filtrer',
    toolbarFiltersLabel: 'Voir les filtres',
    toolbarFiltersTooltipHide: 'Cacher les filtres',
    toolbarFiltersTooltipShow: 'Voir les filtres',
    toolbarFiltersTooltipActive: (count) =>
        count !== 1 ? `${count} active filters` : `${count} active filter`,

    // Quick filter toolbar field
    toolbarQuickFilterPlaceholder: 'Recherche…',
    toolbarQuickFilterLabel: 'Rechercher',
    toolbarQuickFilterDeleteIconLabel: 'Vider',

    // Export selector toolbar button text
    toolbarExport: 'Exporter',
    toolbarExportLabel: 'Exporter',
    toolbarExportCSV: 'Télécharger en CSV',
    toolbarExportPrint: 'Imprimer',
    toolbarExportExcel: 'Télécharger en Excel',

    // Columns management text
    columnsManagementSearchTitle: 'Rechercher',
    columnsManagementNoColumns: 'No columns',
    columnsManagementShowHideAllText: 'Tout afficher/masquer',
    columnsManagementReset: 'Réinitialiser',

    // Filter panel text
    filterPanelAddFilter: 'Add filter',
    filterPanelRemoveAll: 'Remove all',
    filterPanelDeleteIconLabel: 'Delete',
    filterPanelLogicOperator: 'Logic operator',
    filterPanelOperator: 'Operator',
    filterPanelOperatorAnd: 'And',
    filterPanelOperatorOr: 'Or',
    filterPanelColumns: 'Columns',
    filterPanelInputLabel: 'Value',
    filterPanelInputPlaceholder: 'Filter value',

    // Filter operators text
    filterOperatorContains: 'contient',
    filterOperatorEquals: 'égale',
    filterOperatorStartsWith: 'commence par',
    filterOperatorEndsWith: 'fini par',
    filterOperatorIs: 'est',
    filterOperatorNot: 'n\'est pas égale',
    filterOperatorAfter: 'est après',
    filterOperatorOnOrAfter: 'is on or after',
    filterOperatorBefore: 'est avant',
    filterOperatorOnOrBefore: 'is on or before',
    filterOperatorIsEmpty: 'est vide',
    filterOperatorIsNotEmpty: 'n\'est pas vide',
    filterOperatorIsAnyOf: 'is any of',
    'filterOperator=': '=',
    'filterOperator!=': '!=',
    'filterOperator>': '>',
    'filterOperator>=': '>=',
    'filterOperator<': '<',
    'filterOperator<=': '<=',

    // Header filter operators text
    headerFilterOperatorContains: 'Contains',
    headerFilterOperatorEquals: 'Equals',
    headerFilterOperatorStartsWith: 'Starts with',
    headerFilterOperatorEndsWith: 'Ends with',
    headerFilterOperatorIs: 'Is',
    headerFilterOperatorNot: 'Is not',
    headerFilterOperatorAfter: 'Is after',
    headerFilterOperatorOnOrAfter: 'Is on or after',
    headerFilterOperatorBefore: 'Is before',
    headerFilterOperatorOnOrBefore: 'Is on or before',
    headerFilterOperatorIsEmpty: 'Is empty',
    headerFilterOperatorIsNotEmpty: 'Is not empty',
    headerFilterOperatorIsAnyOf: 'Is any of',
    'headerFilterOperator=': 'Equals',
    'headerFilterOperator!=': 'Not equals',
    'headerFilterOperator>': 'Greater than',
    'headerFilterOperator>=': 'Greater than or equal to',
    'headerFilterOperator<': 'Less than',
    'headerFilterOperator<=': 'Less than or equal to',

    // Filter values text
    filterValueAny: 'any',
    filterValueTrue: 'true',
    filterValueFalse: 'false',

    // Column menu text
    columnMenuLabel: 'Menu',
    columnMenuShowColumns: 'Voir les colonnes',
    columnMenuManageColumns: 'Gérer les colonnes',
    columnMenuFilter: 'Filtrer',
    columnMenuHideColumn: 'Masquer la colonne',
    columnMenuUnsort: 'Unsort',
    columnMenuSortAsc: 'Sort by ASC',
    columnMenuSortDesc: 'Sort by DESC',

    // Column header text
    columnHeaderFiltersTooltipActive: (count) =>
        count !== 1 ? `${count} active filters` : `${count} active filter`,
    columnHeaderFiltersLabel: 'Show filters',
    columnHeaderSortIconLabel: 'Sort',

    // Rows selected footer text
    footerRowSelected: (count) =>
        count !== 1
            ? `${count.toLocaleString()} rows selected`
            : `${count.toLocaleString()} row selected`,

    // Total row amount footer text
    footerTotalRows: 'Total Rows:',

    // Total visible row amount footer text
    footerTotalVisibleRows: (visibleCount, totalCount) =>
        `${visibleCount.toLocaleString()} de ${totalCount.toLocaleString()}`,

    // Checkbox selection text
    checkboxSelectionHeaderName: 'Checkbox selection',
    checkboxSelectionSelectAllRows: 'Select all rows',
    checkboxSelectionUnselectAllRows: 'Unselect all rows',
    checkboxSelectionSelectRow: 'Select row',
    checkboxSelectionUnselectRow: 'Unselect row',

    // Boolean cell text
    booleanCellTrueLabel: 'yes',
    booleanCellFalseLabel: 'no',

    // Actions cell more text
    actionsCellMore: 'more',

    // Column pinning text
    pinToLeft: 'Pin to left',
    pinToRight: 'Pin to right',
    unpin: 'Unpin',

    // Tree Data
    treeDataGroupingHeaderName: 'Group',
    treeDataExpand: 'see children',
    treeDataCollapse: 'hide children',

    // Grouping columns
    groupingColumnHeaderName: 'Group',
    groupColumn: (name) => `Group by ${name}`,
    unGroupColumn: (name) => `Stop grouping by ${name}`,

    // Master/detail
    detailPanelToggle: 'Detail panel toggle',
    expandDetailPanel: 'Expand',
    collapseDetailPanel: 'Collapse',

    // Used core components translation keys
    MuiTablePagination: {
        //labelDisplayedRows: ({from, to, count}) => null
    },

    // Row reordering text
    rowReorderingHeaderName: 'Row reordering',

    // Aggregation
    aggregationMenuItemHeader: 'Aggregation',
    aggregationFunctionLabelSum: 'sum',
    aggregationFunctionLabelAvg: 'avg',
    aggregationFunctionLabelMin: 'min',
    aggregationFunctionLabelMax: 'max',
    aggregationFunctionLabelSize: 'size',
};