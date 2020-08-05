// RootNavigation.js

import * as React from 'react';

export const navigationRef = React.createRef();

export function navigate(name, params) {
    navigationRef.current?.navigate(name, params);
}

export function toggleDrawer() {
    navigationRef.current?.toggleDrawer();
}

// add other navigation functions that you need and export them