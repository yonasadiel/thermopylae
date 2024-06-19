import { useEffect } from 'react';
import { useSettings } from '../../hooks';

const Particles = () => {
    const { settings } = useSettings();
    useEffect(() => {
        window.particlesJS(
            'particles-js',
            settings.themeBackgroundParticlesConfig,
            () => { }
        );
    }, [settings.themeForegroundColor]);
    return (
        <div
            id="particles-js"
            style={{
                display: settings.themeBackgroundParticlesEnabled ? 'block' : 'none',
                zIndex: 0,
            }}
        ></div>
    );
};

export default Particles;
