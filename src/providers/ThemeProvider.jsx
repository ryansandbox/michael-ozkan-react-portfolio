/**
 * @author Ryan Balieiro
 * @date 2025-05-10
 * @description This provider handles the theme management for the application, allowing users to switch between different themes.
 */

import React, {createContext, useContext, useEffect, useState} from 'react'
import {useUtils} from "/src/hooks/utils.js"

function ThemeProvider({ children, supportedThemes, defaultThemeId, onThemeChanged }) {
    const utils = useUtils()

    const allThemes = Array.isArray(supportedThemes) && supportedThemes.length > 0 ?
        supportedThemes :
        []

    const defaultTheme = allThemes.find(theme => theme.id === defaultThemeId)
        || allThemes[0]

    const supportsMultipleThemes = allThemes.length >= 2

    const [selectedThemeId, setSelectedThemeId] = useState(null)

    /** @constructs **/
    useEffect(() => {
        if(allThemes.length === 0) {
            utils.log.throwError("ThemeProvider", "The app must support at least one theme. Make sure you filled the supportedThemes property in the settings.json file.")
            return
        }

        const savedThemeId = utils.storage.getPreferredTheme()
        const savedTheme = allThemes.find(theme => theme.id === savedThemeId)
        setSelectedTheme(savedTheme || defaultTheme)
    }, [])

    const getSelectedTheme = () => {
        return allThemes.find(theme => theme.id === selectedThemeId)
    }

    const setSelectedTheme = (theme) => {
        setSelectedThemeId(theme.id)
        utils.storage.setPreferredTheme(theme.id)
        document.documentElement.setAttribute('data-theme', theme.id)
        onThemeChanged(theme.id)
    }

    const getAvailableThemes = (excludeSelected) => {
        if(!allThemes)
            return []

        if(!excludeSelected)
            return allThemes
        return allThemes.filter(theme => theme.id !== selectedThemeId)
    }

    const toggle = () => {
        const selectedTheme = getSelectedTheme()
        const currentIndex = allThemes.indexOf(selectedTheme)
        const targetIndex = currentIndex + 1

        const targetTheme = targetIndex >= allThemes.length ?
            allThemes[0] :
            allThemes[targetIndex]

        setSelectedTheme(targetTheme)
    }

    return (
        <ThemeContext.Provider value={{
            setSelectedTheme,
            getSelectedTheme,
            supportsMultipleThemes,
            getAvailableThemes,
            toggle
        }}>
            {selectedThemeId && (
                <>{children}</>
            )}
        </ThemeContext.Provider>
    )
}

const ThemeContext = createContext(null)
/**
 * @return {{
 *   setSelectedTheme: Function,
 *   getSelectedTheme: Function,
 *   supportsMultipleThemes: Boolean,
 *   getAvailableThemes: Function,
 *   toggle: Function
 * }}
 */
export const useTheme = () => useContext(ThemeContext)

export default ThemeProvider