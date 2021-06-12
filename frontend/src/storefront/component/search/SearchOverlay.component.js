import React from 'react'
import Popover from '@material-ui/core/Popover'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'
import SearchForm from './SearchForm.component'
import { Box } from '@material-ui/core'

export function SearchOverlay() {
    return (
        <PopupState variant="popover" popupId="search-overlay">
            {(popupState) => (
                <div>
                    <IconButton { ...bindTrigger(popupState) } aria-label="search" color="inherit">
                        <SearchIcon />
                    </IconButton>
                    <Popover
                        { ...bindPopover(popupState) }
                        anchorReference="anchorPosition"
                        anchorPosition={ { top: 0, left: window.innerWidth } }
                        marginThreshold={ 0 }
                        PaperProps={ { style: { width: '500px', height: '100%', maxHeight: 'none' } } }
                    >
                        <Box padding={ 2 }>
                            <SearchForm />
                        </Box>
                    </Popover>
                </div>
            )}
        </PopupState>
    )
}

export default SearchOverlay
