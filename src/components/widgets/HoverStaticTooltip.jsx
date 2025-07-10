import "./HoverStaticTooltip.scss"
import React, {useEffect, useState} from 'react'
import Tooltip from "/src/components/generic/Tooltip.jsx"
import {useViewport} from "/src/providers/ViewportProvider.jsx"
import {useUtils} from "/src/hooks/utils.js"
import {useInput} from "/src/providers/InputProvider.jsx"

function HoverStaticTooltip({ id = "", targetId = "", label = "", className = "", onDesktopClick = null }) {
    const viewport = useViewport()
    const input = useInput()
    const utils = useUtils()
    const isTouchDevice = utils.device.isTouchDevice()

    const [visible, setVisible] = useState(false)

    /** @constructs **/
    useEffect(() => {
        if(!targetId)
            return

        const targetEl = document.getElementById(targetId)
        if(!targetEl)
            return

        targetEl.addEventListener("mouseenter", _onTargetMouseEnter)
        targetEl.addEventListener("mouseleave", _onTargetMouseLeave)
        targetEl.addEventListener("click", _onTargetClick)
    }, [null, targetId])

    /** @listens viewport.innerWidth **/
    useEffect(() => {
        _forceHide()
    }, [viewport.innerWidth])

    /** @listens input.mouseUpStatus **/
    useEffect(() => {
        const lastMouseTargetId = input.lastMouseTarget?.getAttribute("id")
        if(lastMouseTargetId === targetId)
            return
        _forceHide()
    }, [input.mouseUpStatus])

    const _onTargetMouseEnter = () => {
        if(isTouchDevice)
            return
        setVisible(true)
    }

    const _onTargetMouseLeave = () => {
        if(isTouchDevice)
            return
        setVisible(false)
    }

    const _onTargetClick = () => {
        if(!isTouchDevice && onDesktopClick)
            onDesktopClick()
        else if(isTouchDevice)
            setVisible(!visible)
    }

    const _forceHide = () => {
        setVisible(false)
    }

    if(!visible)
        return <></>

    return (
        <Tooltip label={label}
                 id={id}
                 className={`status-circle-tooltip text-center ${className}`}/>
    )
}

export default HoverStaticTooltip