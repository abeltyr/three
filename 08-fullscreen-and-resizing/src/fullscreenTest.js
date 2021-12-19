import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const one = document.querySelector('div.one')


window.addEventListener('dblclick', () => {
    if (!document.fullscreenElement) {
        one.requestFullscreen()
    } else {
        console.log(" leave screen")
    }
})

