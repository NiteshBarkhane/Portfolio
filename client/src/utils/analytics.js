export const initGA = (measurementId) => {
    // Google Analytics is optional - install react-ga4 to enable
    if (measurementId) {
        try {
            import('react-ga4').then(ReactGA => {
                ReactGA.default.initialize(measurementId);
            });
        } catch (error) {
            console.log('Google Analytics not available');
        }
    }
};

export const logPageView = () => {
    try {
        import('react-ga4').then(ReactGA => {
            ReactGA.default.send({ hitType: 'pageview', page: window.location.pathname });
        });
    } catch (error) {}
};

export const logEvent = (category, action, label) => {
    try {
        import('react-ga4').then(ReactGA => {
            ReactGA.default.event({ category, action, label });
        });
    } catch (error) {}
};

export const logButtonClick = (buttonName) => {
    logEvent('Button', 'Click', buttonName);
};

export const logFormSubmit = (formName) => {
    logEvent('Form', 'Submit', formName);
};
