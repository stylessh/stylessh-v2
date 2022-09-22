import h from 'preact'
import { useRef, useEffect, useState } from 'preact/hooks'
import { gsap } from 'gsap'

const Welcome = () => {
    const [completed, setCompleted] = useState<boolean>(false)

    const welcomeRef = useRef<HTMLDivElement>(null)
    const progressRef = useRef<HTMLDivElement>(null)


    useEffect(() => {
        // remove scroll bar
        document.body.style.overflow = 'hidden'

        if (progressRef.current) {
            gsap.to(progressRef.current, {
                width: '100%', duration: Math.random() * 2,
                onComplete: () => setCompleted(true)
            })
        }
    }, [])

    const detachLoader = () => {
        if (welcomeRef.current) {
            // timeline
            const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } })

            tl.to('.content', { opacity: 0, duration: 0.5 })
                .to(welcomeRef.current, { height: 0, duration: 1, delay: 0.5 })

            // attach scroll bar
            document.body.style.overflow = 'auto'
        }
    }

    return (
        <div class="h-screen bg-[#0f0f0f] fixed inset-0 z-50 flex justify-center items-center" ref={welcomeRef}>
            <div class="text-center content">
                <div class="bg-gray-500 w-64 h-1">
                    <div class="bg-white w-0 h-1" ref={progressRef}></div>
                </div>

                <button class="mt-6 text-white py-4 px-6 text-sm disabled:opacity-30 transition-opacity" disabled={!completed} onClick={detachLoader}>
                    Get started
                </button>
            </div>
        </div >
    )
}

export default Welcome