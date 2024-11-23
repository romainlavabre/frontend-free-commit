export default class PaginationConfig {
    static RELOAD_EVENT = "pagination-reload";

    _paginationColumns = [];
    _height = 400;
    _perPage = 10;
    _withSelection = false;
    _url = null;
    _uri;
    _fieldAsId;
    _fixedFilters = [];
    _id;
    _onRowClicked;
    _mode = "&&";
    _useSnapshotRefresh = true;
    _toolbarComponents = [];
    _onSelectionChange;
    _withRefreshOption = true;
    _sortBy = null;
    _orderBy = "DESC";
    _hideToolbar = false;
    _hideColumnHeader = false;
    _hideRowPerPage = false;
    _hidePageSelector = false;
    _hideRowCountLabel = false
    _hideFooter = false;
    _overwriteToolbarWith = null;
    _nextOrderEvent = null;
    _reloadInterval = null;
    _toolbarHideColumnManagement = false;
    _toolbarHideDensity = false;
    _disableTextEllipsis = false;

    /**
     *
     * @return {PaginationColumn[]}
     */
    getPaginationColumns() {
        return this._paginationColumns;
    }

    toDataGridColumns(onChange, defaultValue) {
        return this._paginationColumns.map(pc => pc.toDataGridColumn(onChange, defaultValue(pc.getField()), this));
    }

    /**
     *
     * @param  paginationColumn {PaginationColumn}
     * @return {PaginationConfig}
     */
    addPaginationColumn(paginationColumn) {
        this._paginationColumns.push(paginationColumn);
        return this;
    }

    getHeight() {
        return this._height;
    }

    setHeight(height) {
        this._height = height;
        return this;
    }

    getPerPage() {
        return this._perPage;
    }

    /**
     * Row per page <br/>
     * Default : 10
     *
     * @param perPage
     * @return {PaginationConfig}
     */
    setPerPage(perPage) {
        this._perPage = perPage;
        return this;
    }

    withSelection() {
        return this._withSelection;
    }

    /**
     * Define if the rows are selectable. Represented as a checkbox <br/>
     * Default : false
     *
     * @param withSelection
     * @return {PaginationConfig}
     */
    setWithSelection(withSelection) {
        this._withSelection = withSelection;
        return this;
    }

    getUri() {
        return this._uri;
    }

    /**
     * URI only, no url
     *
     * @param uri
     * @return {PaginationConfig}
     */
    setUri(uri) {
        this._uri = uri;
        return this;
    }

    getUrl(){
        return this._url;
    }

    /**
     * Server URL
     * Default : process.env.REACT_APP_API_URL
     * @param url
     * @return {PaginationConfig}
     */
    setUrl(url){
        this._url = url;

        return this;
    }

    getFieldAsId() {
        return this._fieldAsId;
    }

    /**
     * Field to use as unique identifier <br/>
     * Required
     *
     * @param fieldAsId
     * @return {PaginationConfig}
     */
    setFieldAsId(fieldAsId) {
        this._fieldAsId = fieldAsId;
        return this;
    }

    getFixedFilters() {
        return this._fixedFilters;
    }

    /**
     * Immutable filter. Apply at all request <br/>
     * ! INSECURE !
     * @param key
     * @param operator
     * @param value
     * @return {PaginationConfig}
     */
    addFixedFilter(key, operator, value) {
        this._fixedFilters.push({
            key,
            operator,
            value
        });
        return this;
    }

    getId() {
        return this._id;
    }

    /**
     * Unique identifier of the pagination. Used to store the filters and user configuration (row per page, etc)
     * @param id
     * @return {PaginationConfig}
     */
    setId(id) {
        this._id = id;
        return this;
    }

    getOnRowClicked() {
        return this._onRowClicked;
    }

    /**
     * Function to handle row clicked event
     * @param onRowClicked
     * @return {PaginationConfig}
     */
    setOnRowClicked(onRowClicked) {
        this._onRowClicked = onRowClicked;
        return this;
    }

    getMode() {
        return this._mode === "&&" ? "exclude" : "include";
    }

    /**
     * Operator to user between filters <br/>
     * exclude : && <br/>
     * include : || <br/>
     * Default : exclude
     * @param mode
     * @return {PaginationConfig}
     */
    setMode(mode) {
        this._mode = mode;
        return this;
    }

    isUseSnapshotRefresh() {
        return this._useSnapshotRefresh;
    }

    /**
     * Use websocket server for refresh <br/>
     * Require id <br/>
     * Default : true
     * @param useSnapshotRefresh
     * @return {PaginationConfig}
     */
    setUseSnapshotRefresh(useSnapshotRefresh) {
        this._useSnapshotRefresh = useSnapshotRefresh;
        return this;
    }

    getToolbarComponents() {
        return this._toolbarComponents;
    }

    /**
     * Add a button in toolbar
     *
     * @param toolbarComponent
     * @return {PaginationConfig}
     */
    addToolbarComponent(toolbarComponent) {
        this._toolbarComponents.push(toolbarComponent);
        return this;
    }

    getOnSelectionChange() {
        return this._onSelectionChange;
    }

    /**
     * Called when row selection change, the param is array of id <br/>
     * Require : with selection enabled
     *
     * @param onSelectionChange
     * @return {PaginationConfig}
     */
    setOnSelectionChange(onSelectionChange) {
        this._onSelectionChange = onSelectionChange;
        return this;
    }

    isWithRefreshOption() {
        return this._withRefreshOption;
    }

    /**
     * Add button in toolbar
     * Default : true
     *
     * @param withRefreshOption
     * @return {PaginationConfig}
     */
    setWithRefreshOption(withRefreshOption) {
        this._withRefreshOption = withRefreshOption;
        return this;
    }

    getSortBy() {
        return this._sortBy;
    }

    /**
     * Field used to sort result
     * Default : Unique if field
     *
     * @param sortBy
     * @return {PaginationConfig}
     */
    setSortBy(sortBy) {
        this._sortBy = sortBy;
        return this;
    }

    getOrderBy() {
        return this._orderBy;
    }

    /**
     * Default : DESC
     * @param orderBy
     * @return {PaginationConfig}
     */
    setOrderBy(orderBy) {
        this._orderBy = orderBy;
        return this;
    }

    isHideToolbar() {
        return this._hideToolbar;
    }

    /**
     * Default : false
     * @param hideToolbar
     * @return {PaginationConfig}
     */
    setHideToolbar(hideToolbar) {
        this._hideToolbar = hideToolbar;
        return this;
    }

    isHideColumnHeader() {
        return this._hideColumnHeader;
    }

    /**
     * Default : false
     * @param hideColumnHeader
     * @return {PaginationConfig}
     */
    setHideColumnHeader(hideColumnHeader) {
        this._hideColumnHeader = hideColumnHeader;
        return this;
    }

    isHideRowPerPage() {
        return this._hideRowPerPage;
    }

    /**
     * Default : false
     * @param hideRowPerPage
     * @return {PaginationConfig}
     */
    setHideRowPerPage(hideRowPerPage) {
        this._hideRowPerPage = hideRowPerPage;
        return this;
    }

    isHidePageSelector() {
        return this._hidePageSelector;
    }

    /**
     * Default : false
     * @param hidePageSelector
     * @return {PaginationConfig}
     */
    setHidePageSelector(hidePageSelector) {
        this._hidePageSelector = hidePageSelector;
        return this;
    }

    setHideRowCountLabel(hideRowCountLabel) {
        this._hideRowCountLabel = hideRowCountLabel;
        return this;
    }

    isHideRowCountLabel() {
        return this._hideRowCountLabel;
    }

    isHideFooter() {
        return this._hideFooter;
    }

    setHideFooter(hideFooter) {
        this._hideFooter = hideFooter;
        return this;
    }

    getOverwriteToolbarWith() {
        return this._overwriteToolbarWith;
    }

    /**
     *
     * @param html {function(): JSX.Element}
     * @return {PaginationConfig}
     */
    setOverwriteToolbarWith(html) {
        this._overwriteToolbarWith = html;

        return this;
    }

    getNextOrderEvent() {
        return this._nextOrderEvent;
    }

    setNextOrderEvent(event) {
        this._nextOrderEvent = event;

        return this;
    }

    getReloadInterval() {
        return this._reloadInterval;
    }

    /**
     * Default : null
     * @param milli Millisecond
     * @return {PaginationConfig}
     */
    setReloadInterval(milli) {
        this._reloadInterval = milli;

        return this;
    }

    isToolbarHideColumnManagement() {
        return this._toolbarHideColumnManagement;
    }

    /**
     * Hide button "Column" in toolbar
     * Default: false
     *
     * @param toolbarHideColumnManagement {boolean}
     * @return {PaginationConfig}
     */
    setToolbarHideColumnManagement(toolbarHideColumnManagement) {
        this._toolbarHideColumnManagement = toolbarHideColumnManagement;

        return this;
    }

    isToolbarHideDensity() {
        return this._toolbarHideDensity;
    }

    /**
     * Hide button "Density" in toolbar
     * Default: false
     *
     * @param toolbarHideDensity {boolean}
     * @return {PaginationConfig}
     */
    setToolbarHideDensity(toolbarHideDensity) {
        this._toolbarHideDensity = toolbarHideDensity;

        return this;
    }

    isDisableTextEllipsis() {
        return this._disableTextEllipsis;
    }

    /**
     * Default : false
     * @param disableTextEllipsis {boolean}
     * @return {PaginationConfig}
     */
    setDisableTextEllipsis(disableTextEllipsis) {
        this._disableTextEllipsis = disableTextEllipsis;

        return this;
    }
}