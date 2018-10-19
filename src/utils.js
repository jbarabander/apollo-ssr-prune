function getComponentDisplayName(Component) {
  return Component.displayName || Component.name || 'Unknown';
}

export { getComponentDisplayName };