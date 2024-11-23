import {GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector} from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import {Button, Tooltip} from "@mui/material";
import {Download, Refresh, Replay} from "@mui/icons-material";
import isNull from "../../mixin/isNull";

export default function ({
                             onResetFilter,
                             customComponents,
                             onRefresh,
                             onExport,
                             hideDensity,
                             hideColumnManagement,
                             onResetDimension
                         }) {

    return (
        <GridToolbarContainer>
            {
                !hideColumnManagement
                    ? (
                        <GridToolbarColumnsButton
                            slotProps={{tooltip: {title: "Gérer les colonnes"}}}
                        />
                    )
                    : null
            }
            {
                !hideDensity
                    ? (
                        <GridToolbarDensitySelector
                            slotProps={{tooltip: {title: 'Changer la densité'}}}
                        />
                    )
                    : null
            }
            <Tooltip title={"Réinitialiser les dimensions"}>
                <Button startIcon={<Replay/>} size="small" onClick={onResetDimension}>
                    Dimensions
                </Button>
            </Tooltip>
            <Tooltip title={"Réinitialiser les filtres"}>
                <Button startIcon={<Replay/>} size="small" onClick={onResetFilter}>
                    Filtres
                </Button>
            </Tooltip>
            {
                !isNull(onRefresh)
                    ? (
                        <Button startIcon={<Refresh/>} onClick={onRefresh} size="small"
                                title="Les données sont actualisées automatiquement. À utiliser de manière exceptionnelle.">
                            Actualiser
                        </Button>
                    )
                    : null
            }
            <Tooltip title={"Exporter les données"}>
                <Button startIcon={<Download/>} size={"small"} onClick={onExport}>
                    Exporter
                </Button>
            </Tooltip>
            <Box sx={{flexGrow: 1}}/>
            {
                customComponents.map((component, index) => (
                    <div key={index}>
                        {component}
                    </div>
                ))
            }
        </GridToolbarContainer>
    );
}