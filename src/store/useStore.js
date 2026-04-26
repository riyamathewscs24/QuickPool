import { create } from 'zustand';

// Initial Mock Data
const INITIAL_TRIPS = [
  {
    id: '1',
    from: 'BMSCE Gate 1',
    drop: 'Majestic Metro Station',
    creator: 'Rahul Sharma',
    departureTime: 'Today, 5:30 PM',
    members: ['Rahul Sharma', 'Anjali Gupta'],
    maxMembers: 3,
    price: '₹50',
    genderPreference: 'Any',
    status: 'Upcoming'
  },
  {
    id: '2',
    from: 'BMSCE Boys Hostel',
    drop: 'KSR Bengaluru Railway Station',
    creator: 'Vikram Singh',
    departureTime: 'Tomorrow, 6:00 AM',
    members: ['Vikram Singh'],
    maxMembers: 3,
    price: '₹60',
    genderPreference: 'Male Only',
    status: 'Upcoming'
  },
  {
    id: '3',
    from: 'BMSCE Main Gate',
    drop: 'Koramangala',
    creator: 'Priya Desai',
    departureTime: 'Saturday, 7:00 PM',
    members: ['Priya Desai', 'Neha'],
    maxMembers: 3,
    price: '₹80',
    genderPreference: 'Female Only',
    status: 'Upcoming'
  }
];

export const useStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  trips: INITIAL_TRIPS,
  notifications: [
    { id: '1', message: 'Your ride to Majestic Metro is confirmed!', time: '10 mins ago' },
    { id: '2', message: 'New ride available to Airport from BMSCE.', time: '1 hour ago' }
  ],

  // Auth actions
  login: (userData) => set({ user: userData, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
  signup: (userData) => set({ user: userData, isAuthenticated: true }),

  // Trip actions
  addTrip: (trip) => set((state) => ({
    trips: [{ ...trip, id: Math.random().toString(), members: [state.user.name], maxMembers: 3, status: 'Upcoming' }, ...state.trips]
  })),
  
  joinTrip: (tripId) => set((state) => ({
    trips: state.trips.map(trip => {
      if (trip.id === tripId && !trip.members.includes(state.user.name) && trip.members.length < trip.maxMembers) {
        return { ...trip, members: [...trip.members, state.user.name] };
      }
      return trip;
    })
  })),

  leaveTrip: (tripId) => set((state) => ({
    trips: state.trips.map(trip => {
      if (trip.id === tripId && trip.members.includes(state.user.name)) {
        return { ...trip, members: trip.members.filter(m => m !== state.user.name) };
      }
      return trip;
    })
  })),
}));
