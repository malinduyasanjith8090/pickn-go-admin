import React, { useState, useRef } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import OwnerSideNav from '../components/navigation/OwnerSideNav.component';

const historyBookings = [
  { id: '#B001', customer: 'C001', vehicle: 'V001', type: 'Completed', requested: 'Aug 12, 2025', start: 'Sep 01, 2025', end: 'Sep 04, 2025' },
  { id: '#B002', customer: 'C002', vehicle: 'V002', type: 'Completed', requested: 'Sep 10, 2025', start: 'Sep 01, 2025', end: 'Sep 03, 2025' },
  { id: '#B003', customer: 'C003', vehicle: 'V003', type: 'Completed', requested: 'Sep 05, 2025', start: 'Sep 03, 2025', end: 'Sep 06, 2025' },
  { id: '#B004', customer: 'C004', vehicle: 'V004', type: 'Cancelled', requested: 'Sep 12, 2025', start: 'Sep 10, 2025', end: 'Sep 12, 2025' },
  { id: '#B005', customer: 'C005', vehicle: 'V005', type: 'Cancelled', requested: 'Sep 15, 2025', start: 'Sep 14, 2025', end: 'Sep 16, 2025' },
];

const upcomingBookings = [
  { id: '#B008', customer: 'C008', vehicle: 'V008', type: 'Upcoming', status: 'Pending', start: 'Sep 04, 2025', end: 'Sep 10, 2025' },
  { id: '#B009', customer: 'C009', vehicle: 'V009', type: 'Upcoming', status: 'Pending', start: 'Sep 04, 2025', end: 'Sep 10, 2025' },
  { id: '#B010', customer: 'C010', vehicle: 'V010', type: 'Upcoming', status: 'Accepted', start: 'Sep 04, 2025', end: 'Sep 10, 2025' },
  { id: '#B011', customer: 'C011', vehicle: 'V011', type: 'Ongoing', status: 'Accepted', start: 'Sep 04, 2025', end: 'Sep 10, 2025' },
  { id: '#B012', customer: 'C012', vehicle: 'V012', type: 'Ongoing', status: 'Accepted', start: 'Sep 04, 2025', end: 'Sep 10, 2025' },
];

const detailedBookingData = {
  '#B001': {
    vehicleType: 'SUV',
    vehicleBrand: 'Toyota',
    keyFeatures: 'Spacious, fuel efficient, reliable',
    vehicleId: 'V001',
    ownerId: 'R001',
    ownerName: 'John Smith',
    customerName: 'Alice Johnson',
    ownerPhone: '0771234567',
    requestDate: 'Aug 12, 2025',
    startDate: 'Sep 01, 2025',
    endDate: 'Sep 04, 2025',
    startLocation: 'Colombo',
    endLocation: 'Galle',
    rentPerDay: 'Rs.15000.00',
    rentFor: '3 Days',
    totalCharge: 'Rs.45000.00',
    status: 'Completed',
    vehicleImage: 'https://example.com/toyota-suv.jpg'
  },
  '#B002': {
    vehicleType: 'Sedan',
    vehicleBrand: 'Honda',
    keyFeatures: 'Comfortable, good mileage, smooth drive',
    vehicleId: 'V002',
    ownerId: 'R002',
    ownerName: 'Jane Doe',
    customerName: 'Bob Wilson',
    ownerPhone: '0772345678',
    requestDate: 'Sep 10, 2025',
    startDate: 'Sep 01, 2025',
    endDate: 'Sep 03, 2025',
    startLocation: 'Kandy',
    endLocation: 'Colombo',
    rentPerDay: 'Rs.12000.00',
    rentFor: '2 Days',
    totalCharge: 'Rs.24000.00',
    status: 'Completed',
    vehicleImage: 'https://example.com/honda-sedan.jpg'
  },
  '#B003': {
    vehicleType: 'Hatchback',
    vehicleBrand: 'Suzuki',
    keyFeatures: 'Compact, easy parking, city friendly',
    vehicleId: 'V003',
    ownerId: 'R003',
    ownerName: 'Mike Johnson',
    customerName: 'Carol Brown',
    ownerPhone: '0773456789',
    requestDate: 'Sep 05, 2025',
    startDate: 'Sep 03, 2025',
    endDate: 'Sep 06, 2025',
    startLocation: 'Galle',
    endLocation: 'Matara',
    rentPerDay: 'Rs.8000.00',
    rentFor: '3 Days',
    totalCharge: 'Rs.24000.00',
    status: 'Completed',
    vehicleImage: 'https://example.com/suzuki-hatchback.jpg'
  },
  '#B004': {
    vehicleType: 'Van',
    vehicleBrand: 'Toyota',
    keyFeatures: 'Large capacity, family friendly, spacious',
    vehicleId: 'V004',
    ownerId: 'R004',
    ownerName: 'Sarah Davis',
    customerName: 'David Lee',
    ownerPhone: '0774567890',
    requestDate: 'Sep 12, 2025',
    startDate: 'Sep 10, 2025',
    endDate: 'Sep 12, 2025',
    startLocation: 'Negombo',
    endLocation: 'Anuradhapura',
    rentPerDay: 'Rs.18000.00',
    rentFor: '2 Days',
    totalCharge: 'Rs.36000.00',
    status: 'Cancelled',
    vehicleImage: 'https://example.com/toyota-van.jpg'
  },
  '#B005': {
    vehicleType: 'SUV',
    vehicleBrand: 'Mitsubishi',
    keyFeatures: 'Off-road capable, powerful, adventurous',
    vehicleId: 'V005',
    ownerId: 'R005',
    ownerName: 'Tom Wilson',
    customerName: 'Emma White',
    ownerPhone: '0775678901',
    requestDate: 'Sep 15, 2025',
    startDate: 'Sep 14, 2025',
    endDate: 'Sep 16, 2025',
    startLocation: 'Colombo',
    endLocation: 'Ella',
    rentPerDay: 'Rs.22000.00',
    rentFor: '2 Days',
    totalCharge: 'Rs.44000.00',
    status: 'Cancelled',
    vehicleImage: 'https://example.com/mitsubishi-suv.jpg'
  },
  '#B008': {
    vehicleType: 'Sedan',
    vehicleBrand: 'Nissan',
    keyFeatures: 'Modern design, fuel efficient, comfortable',
    vehicleId: 'V008',
    ownerId: 'R008',
    ownerName: 'Lisa Garcia',
    customerName: 'James Miller',
    ownerPhone: '0778901234',
    requestDate: 'Sep 01, 2025',
    startDate: 'Sep 04, 2025',
    endDate: 'Sep 10, 2025',
    startLocation: 'Colombo',
    endLocation: 'Jaffna',
    rentPerDay: 'Rs.14000.00',
    rentFor: '6 Days',
    totalCharge: 'Rs.84000.00',
    status: 'Pending',
    vehicleImage: 'https://example.com/nissan-sedan.jpg'
  },
  '#B009': {
    vehicleType: 'Hatchback',
    vehicleBrand: 'Volkswagen',
    keyFeatures: 'European quality, reliable, stylish',
    vehicleId: 'V009',
    ownerId: 'R009',
    ownerName: 'Chris Anderson',
    customerName: 'Maria Rodriguez',
    ownerPhone: '0779012345',
    requestDate: 'Sep 02, 2025',
    startDate: 'Sep 04, 2025',
    endDate: 'Sep 10, 2025',
    startLocation: 'Kandy',
    endLocation: 'Trincomalee',
    rentPerDay: 'Rs.10000.00',
    rentFor: '6 Days',
    totalCharge: 'Rs.60000.00',
    status: 'Pending',
    vehicleImage: 'https://example.com/vw-hatchback.jpg'
  },
  '#B010': {
    vehicleType: 'SUV',
    vehicleBrand: 'Ford',
    keyFeatures: 'Powerful engine, spacious interior, advanced tech',
    vehicleId: 'V010',
    ownerId: 'R010',
    ownerName: 'Kevin Brown',
    customerName: 'Anna Taylor',
    ownerPhone: '0780123456',
    requestDate: 'Sep 03, 2025',
    startDate: 'Sep 04, 2025',
    endDate: 'Sep 10, 2025',
    startLocation: 'Galle',
    endLocation: 'Batticaloa',
    rentPerDay: 'Rs.20000.00',
    rentFor: '6 Days',
    totalCharge: 'Rs.120000.00',
    status: 'Accepted',
    vehicleImage: 'https://example.com/ford-suv.jpg'
  },
  '#B011': {
    vehicleType: 'Van',
    vehicleBrand: 'Hyundai',
    keyFeatures: 'Commercial grade, reliable, spacious cargo',
    vehicleId: 'V011',
    ownerId: 'R011',
    ownerName: 'Michelle Lee',
    customerName: 'Peter Clark',
    ownerPhone: '0781234567',
    requestDate: 'Sep 01, 2025',
    startDate: 'Sep 04, 2025',
    endDate: 'Sep 10, 2025',
    startLocation: 'Colombo',
    endLocation: 'Polonnaruwa',
    rentPerDay: 'Rs.16000.00',
    rentFor: '6 Days',
    totalCharge: 'Rs.96000.00',
    status: 'Accepted',
    vehicleImage: 'https://example.com/hyundai-van.jpg'
  },
  '#B012': {
    vehicleType: 'SUV',
    vehicleBrand: 'Jaguar',
    keyFeatures: 'Stylish design, luxury interior, advanced safety features',
    vehicleId: 'V012',
    ownerId: 'R012',
    ownerName: 'John Doe',
    customerName: 'Alexa Safran',
    ownerPhone: '0777777777',
    requestDate: 'Sep 04, 2025',
    startDate: 'Sep 10, 2025',
    endDate: 'Sep 12, 2025',
    startLocation: 'Colombo',
    endLocation: 'Kandy',
    rentPerDay: 'Rs.20000.00',
    rentFor: '3 Days',
    totalCharge: 'Rs.60000.00',
    status: 'Accepted',
    vehicleImage: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80'
  }
};

const getStatusBadge = (status, type) => {
  if (status === 'Completed' || type === 'Completed') {
    return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-300">Completed</span>;
  }
  if (status === 'Cancelled' || type === 'Cancelled') {
    return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 border border-red-300">Cancelled</span>;
  }
  if (status === 'Pending') {
    return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700 border border-yellow-300">Pending</span>;
  }
  if (status === 'Accepted') {
    return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-300">Accepted</span>;
  }
  if (type === 'Ongoing') {
    return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 border border-blue-300">Ongoing</span>;
  }
  if (type === 'Upcoming') {
    return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 border border-purple-300">Upcoming</span>;
  }
  return null;
};

const statusStyles = {
  Completed: 'bg-green-100 text-green-600 border-green-400',
  Ongoing: 'bg-blue-100 text-blue-600 border-blue-400',
  Upcoming: 'bg-purple-100 text-purple-600 border-purple-400',
  Cancelled: 'bg-red-100 text-red-600 border-red-400',
};

const calendarData = {
  Ongoing: [3, 4],
  Upcoming: [10, 11, 12],
  Completed: [1, 2],
};

function Booking() {
  const [tab, setTab] = useState('History');
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarAnim, setCalendarAnim] = useState('');
  const [showBookingDetails, setShowBookingDetails] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const filteredBookings = tab === 'History'
    ? historyBookings
    : upcomingBookings;

  const handleViewBooking = (booking) => {
    const detailedData = detailedBookingData[booking.id];
    if (detailedData) {
      setSelectedBooking({ ...booking, ...detailedData });
      setShowBookingDetails(true);
    }
  };

  const closeModal = () => {
    setShowBookingDetails(false);
    setSelectedBooking(null);
  };

  const getVehicleImage = (vehicleType, vehicleBrand) => {
    const imageMap = {
      'SUV': '/images/suv.png',
      'Sedan': '/images/sedan.jpeg', 
      'Hatchback': '/images/hatchback.jpg',
      'Van': '/images/van.jpg'
    };
    return imageMap[vehicleType] || '/images/default-car.png';
  };

  return (
    <div className="relative min-h-screen bg-white">
      {/* Owner Side Navigation */}
      <OwnerSideNav />
      {/* Main Content with left margin for sidebar */}
      <div className="md:ml-[var(--sidebar-width,4rem)] transition-all duration-300">
        <div className="p-4 sm:p-8">
          <div className="flex items-center mb-6">
            <h1 className="text-xl sm:text-2xl font-bold">Confirmed Bookings</h1>
          </div>
          <div className="flex gap-8 border-b border-gray-200 mb-4">
            <button
              className={`pb-2 px-2 font-semibold ${tab === 'History' ? 'border-b-2 border-black text-black' : 'text-gray-400'}`}
              onClick={() => setTab('History')}
            >
              History
            </button>
            <button
              className={`pb-2 px-2 font-semibold ${tab === 'Upcoming' ? 'border-b-2 border-black text-black' : 'text-gray-400'}`}
              onClick={() => setTab('Upcoming')}
            >
              Upcoming / Ongoing
            </button>
          </div>
          <div className="flex flex-col gap-8 items-center">
            {/* Desktop Table */}
            <div className="w-full overflow-x-auto mb-8 hidden md:block">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead>
                  <tr className="text-left text-gray-500 text-sm">
                    <th className="py-2 px-3 font-semibold">BookingID</th>
                    <th className="py-2 px-3 font-semibold">Customer ID</th>
                    <th className="py-2 px-3 font-semibold">Vehicle ID</th>
                    <th className="py-2 px-3 font-semibold">Type</th>
                    {tab !== 'History' && <th className="py-2 px-3 font-semibold">Status</th>}
                    {tab === 'History' && <th className="py-2 px-3 font-semibold">Requested Date</th>}
                    <th className="py-2 px-3 font-semibold">Start Date</th>
                    <th className="py-2 px-3 font-semibold">End Date</th>
                    <th className="py-2 px-3 font-semibold">{tab === 'History' ? 'Actions' : 'Details'}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((b, i) => (
                    <tr key={b.id} className="border-t border-gray-100 text-sm">
                      <td className="py-2 px-3">{b.id}</td>
                      <td className="py-2 px-3">{b.customer}</td>
                      <td className="py-2 px-3">{b.vehicle}</td>
                      <td className="py-2 px-3">
                        {tab === 'History' && b.type === 'Completed' && (
                          <span className="px-2 py-1 rounded border text-xs font-semibold bg-green-50 text-green-700 border-green-300">Completed</span>
                        )}
                        {tab === 'History' && b.type === 'Cancelled' && (
                          <span className="px-2 py-1 rounded border text-xs font-semibold bg-red-50 text-red-700 border-red-300">Cancelled</span>
                        )}
                        {tab !== 'History' && b.type === 'Upcoming' && (
                          <span className="px-2 py-1 rounded border text-xs font-semibold bg-purple-50 text-purple-600 border-purple-300">Upcoming</span>
                        )}
                        {tab !== 'History' && b.type === 'Ongoing' && (
                          <span className="px-2 py-1 rounded border text-xs font-semibold bg-blue-50 text-blue-600 border-blue-300">Ongoing</span>
                        )}
                      </td>
                      {tab !== 'History' && (
                        <td className="py-2 px-3">
                          {b.status === 'Pending' && (
                            <span className="px-2 py-1 rounded border text-xs font-semibold bg-yellow-50 text-yellow-700 border-yellow-300">Pending</span>
                          )}
                          {b.status === 'Accepted' && (
                            <span className="px-2 py-1 rounded border text-xs font-semibold bg-green-50 text-green-700 border-green-300">Accepted</span>
                          )}
                        </td>
                      )}
                      {tab === 'History' && <td className="py-2 px-3">{b.requested}</td>}
                      <td className="py-2 px-3">{b.start}</td>
                      <td className="py-2 px-3">{b.end}</td>
                      <td className="py-2 px-3">
                        <button 
                          className="bg-[#ffb000] text-white px-4 py-1 rounded font-semibold hover:bg-black hover:text-white transition"
                          onClick={() => handleViewBooking(b)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="w-full md:hidden space-y-4">
              {filteredBookings.map((b) => (
                <div key={b.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-800">{b.id}</h3>
                      <p className="text-sm text-gray-600">Customer: {b.customer}</p>
                      <p className="text-sm text-gray-600">Vehicle: {b.vehicle}</p>
                    </div>
                    <div className="text-right">
                      {tab === 'History' && b.type === 'Completed' && (
                        <span className="px-2 py-1 rounded border text-xs font-semibold bg-green-50 text-green-700 border-green-300">Completed</span>
                      )}
                      {tab === 'History' && b.type === 'Cancelled' && (
                        <span className="px-2 py-1 rounded border text-xs font-semibold bg-red-50 text-red-700 border-red-300">Cancelled</span>
                      )}
                      {tab !== 'History' && b.type === 'Upcoming' && (
                        <span className="px-2 py-1 rounded border text-xs font-semibold bg-purple-50 text-purple-600 border-purple-300">Upcoming</span>
                      )}
                      {tab !== 'History' && b.type === 'Ongoing' && (
                        <span className="px-2 py-1 rounded border text-xs font-semibold bg-blue-50 text-blue-600 border-blue-300">Ongoing</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
                    {tab !== 'History' && (
                      <div>
                        <span className="text-gray-600">Status: </span>
                        {b.status === 'Pending' && (
                          <span className="px-2 py-1 rounded border text-xs font-semibold bg-yellow-50 text-yellow-700 border-yellow-300">Pending</span>
                        )}
                        {b.status === 'Accepted' && (
                          <span className="px-2 py-1 rounded border text-xs font-semibold bg-green-50 text-green-700 border-green-300">Accepted</span>
                        )}
                      </div>
                    )}
                    {tab === 'History' && (
                      <div>
                        <span className="text-gray-600">Requested: </span>
                        <span>{b.requested}</span>
                      </div>
                    )}
                    <div>
                      <span className="text-gray-600">Start: </span>
                      <span>{b.start}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">End: </span>
                      <span>{b.end}</span>
                    </div>
                  </div>

                  <button 
                    className="w-full bg-[#ffb000] text-white px-4 py-2 rounded font-semibold hover:bg-black hover:text-white transition"
                    onClick={() => handleViewBooking(b)}
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
        
      {/* Booking Details Modal */}
      {showBookingDetails && selectedBooking && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" style={{backdropFilter: 'blur(1px)'}}></div>
          
          {/* Modal Content */}
          <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-lg w-full max-w-4xl mt-8 mb-8 shadow-xl">
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={closeModal}
                      className="text-gray-600 hover:text-gray-900 p-1"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <h2 className="text-lg sm:text-xl font-bold">Booking ID : {selectedBooking.id}</h2>
                    {getStatusBadge(selectedBooking.status || selectedBooking.type, selectedBooking.status || selectedBooking.type)}
                  </div>
                </div>

                {/* Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-6">
                  {/* Vehicle Image */}
                  <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-4 sm:p-8 flex items-center justify-center">
                    <div className="w-full h-48 sm:h-64 bg-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
                      <img 
                          src={getVehicleImage(selectedBooking.vehicleType, selectedBooking.vehicleBrand)} 
                          alt={`${selectedBooking.vehicleBrand} ${selectedBooking.vehicleType}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = '/images/default-car.png';
                        }}
                      />
                    </div>
                  </div>

                  {/* Vehicle Details */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Vehicle Type</label>
                        <p className="text-gray-900 bg-gray-50 p-2 rounded">{selectedBooking.vehicleType}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Vehicle Brand</label>
                        <p className="text-gray-900 bg-gray-50 p-2 rounded">{selectedBooking.vehicleBrand}</p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Key Features</label>
                      <p className="text-gray-900 bg-gray-50 p-2 rounded">{selectedBooking.keyFeatures}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Vehicle ID</label>
                        <p className="text-gray-900 bg-gray-50 p-2 rounded">{selectedBooking.vehicleId}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Owner ID</label>
                        <p className="text-gray-900 bg-gray-50 p-2 rounded">{selectedBooking.ownerId}</p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Customer ID</label>
                      <p className="text-gray-900 bg-gray-50 p-2 rounded">{selectedBooking.customer}</p>
                    </div>
                  </div>
                </div>

                {/* Booking Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Request Date</label>
                    <p className="text-gray-900 bg-gray-50 p-2 rounded text-sm">{selectedBooking.requestDate}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Start Date</label>
                    <p className="text-gray-900 bg-gray-50 p-2 rounded text-sm">{selectedBooking.startDate}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Owner Name</label>
                    <p className="text-gray-900 bg-gray-50 p-2 rounded text-sm">{selectedBooking.ownerName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">End Date</label>
                    <p className="text-gray-900 bg-gray-50 p-2 rounded text-sm">{selectedBooking.endDate}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Customer Name</label>
                    <p className="text-gray-900 bg-gray-50 p-2 rounded text-sm">{selectedBooking.customerName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Start Location</label>
                    <p className="text-gray-900 bg-gray-50 p-2 rounded text-sm">{selectedBooking.startLocation}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Owner Phone No</label>
                    <p className="text-gray-900 bg-gray-50 p-2 rounded text-sm">{selectedBooking.ownerPhone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">End Location</label>
                    <p className="text-gray-900 bg-gray-50 p-2 rounded text-sm">{selectedBooking.endLocation}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Rent Per Day</label>
                    <p className="text-gray-900 bg-gray-50 p-2 rounded text-sm">{selectedBooking.rentPerDay}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Rent For</label>
                    <p className="text-gray-900 bg-gray-50 p-2 rounded text-sm">{selectedBooking.rentFor}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
                    <div className="mt-1">
                      {getStatusBadge(selectedBooking.status || selectedBooking.type, selectedBooking.status || selectedBooking.type)}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Total Charge</label>
                    <p className="text-red-600 font-bold text-lg bg-red-50 p-2 rounded">{selectedBooking.totalCharge}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Floating Calendar Button */}
      <button
        className="fixed z-50 bottom-8 right-8 bg-[#ffb000] hover:bg-gray-300 text-white rounded-full shadow-lg p-4 flex items-center justify-center transition-all duration-200"
        onClick={() => {
          if (!showCalendar) {
            setCalendarAnim('slideIn');
            setShowCalendar(true);
          } else {
            setCalendarAnim('slideOut');
            setTimeout(() => setShowCalendar(false), 300);
          }
        }}
        aria-label="Show Calendar"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <rect x="3" y="4" width="18" height="18" rx="3" fill="#fff" stroke="#ffb000" strokeWidth="2"/>
          <rect x="7" y="8" width="10" height="8" rx="1" fill="#ffb000"/>
          <path stroke="#ffb000" strokeWidth="2" d="M16 2v4M8 2v4"/>
        </svg>
      </button>

      {/* Calendar Popup */}
      {showCalendar && (
        <>
          <div className="fixed inset-0 z-40 bg-transparent" onClick={() => {
            setCalendarAnim('slideOut');
            setTimeout(() => setShowCalendar(false), 300);
          }} />
          <div className={`fixed z-50 bottom-24 right-8 w-80 max-w-full bg-white border-2 border-[#ffb000] rounded-xl shadow-2xl p-6 flex flex-col items-center ${calendarAnim === 'slideIn' ? 'animate-slideIn' : ''} ${calendarAnim === 'slideOut' ? 'animate-slideOut' : ''}`}
            onAnimationEnd={() => { if (calendarAnim === 'slideOut') setCalendarAnim(''); }}
          >
            <div className="w-full flex justify-end mb-2">
              <button className="text-gray-400 hover:text-black text-xl" onClick={() => {
                setCalendarAnim('slideOut');
                setTimeout(() => setShowCalendar(false), 300);
              }} aria-label="Close Calendar">&times;</button>
            </div>
            <Calendar
              tileClassName={({ date, view }) => {
                if (view === 'month') {
                  const d = date.getDate();
                  if ([6,7].includes(d)) return 'react-calendar__tile--ongoing';
                  if ([19,20].includes(d)) return 'react-calendar__tile--upcoming';
                  if ([2,3].includes(d)) return 'react-calendar__tile--completed';
                }
                return null;
              }}
            />
            <style>{`
              .react-calendar__tile--ongoing {
                background: #e0edff !important;
                border: 2px solid #60a5fa !important;
                color: #2563eb !important;
                border-radius: 0.5rem !important;
              }
              .react-calendar__tile--upcoming {
                background: #f3e8ff !important;
                border: 2px solid #a78bfa !important;
                color: #7c3aed !important;
                border-radius: 0.5rem !important;
              }
              .react-calendar__tile--completed {
                background: #dcfce7 !important;
                border: 2px solid #4ade80 !important;
                color: #059669 !important;
                border-radius: 0.5rem !important;
              }
            `}</style>
            <div className="flex gap-4 mt-4 justify-center text-xs">
              <div className="flex items-center gap-1"><span className="inline-block w-4 h-4 bg-[#e0edff] border-2 border-[#60a5fa] rounded mr-1"></span>Ongoing</div>
              <div className="flex items-center gap-1"><span className="inline-block w-4 h-4 bg-[#f3e8ff] border-2 border-[#a78bfa] rounded mr-1"></span>Upcoming</div>
              <div className="flex items-center gap-1"><span className="inline-block w-4 h-4 bg-[#dcfce7] border-2 border-[#4ade80] rounded mr-1"></span>Completed</div>
            </div>
          </div>
          <style>{`
            @keyframes slideIn {
              from { transform: translateX(120%); opacity: 0; }
              to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
              from { transform: translateX(0); opacity: 1; }
              to { transform: translateX(120%); opacity: 0; }
            }
            .animate-slideIn {
              animation: slideIn 0.3s cubic-bezier(0.4,0,0.2,1) forwards;
            }
            .animate-slideOut {
              animation: slideOut 0.3s cubic-bezier(0.4,0,0.2,1) forwards;
            }
          `}</style>
        </>
      )}
    </div>
  );
}

export default Booking;

//