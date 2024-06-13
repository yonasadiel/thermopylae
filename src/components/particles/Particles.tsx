import { useEffect } from "react";
import { useSettings } from "../../hooks";

const Particles = () => {
    const { settings } = useSettings();
    useEffect(() => {
        window.particlesJS(
            "particles-js",
            settings.backgroundParticlesConfig,
            () => { }
        );
    });
    return (
        <div
            id="particles-js"
            style={{
                display: settings.backgroundParticlesEnabled ? "block" : "none",
            }}
        ></div>
    );
};

export default Particles;
