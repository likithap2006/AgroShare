// ═══════════════════════════════════════════════════
//  AgroShare – config.js
//  This file is kept for backward compatibility.
//  All configuration is now in js/firebase-config.js
//
//  App-wide constants you can customise:
// ═══════════════════════════════════════════════════

const APP_CONFIG = {
  name:        'AgroShare',
  tagline:     'Rent Farm Equipment From Your Neighbors',
  currency:    '₹',
  version:     '2.0.0',
  supportEmail:'support@agroshare.in',

  // Equipment categories
  categories: [
    { id: 'tractor',   label: 'Tractor',   icon: '🚜' },
    { id: 'harvester', label: 'Harvester', icon: '🌾' },
    { id: 'drone',     label: 'Drone',     icon: '🚁' },
    { id: 'pump',      label: 'Pump',      icon: '💧' },
    { id: 'other',     label: 'Other',     icon: '⚙️' },
  ],

  // Booking statuses
  bookingStatuses: ['pending', 'confirmed', 'completed', 'cancelled'],

  // User roles
  roles: ['renter', 'owner', 'operator', 'admin'],
};
