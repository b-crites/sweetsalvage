import React from 'react';

const MonthSelectionModal = ({ isOpen, onClose, onStart, setSelectedMonths }) => {
  const handleChange = (e) => {
    setSelectedMonths(parseInt(e.target.value, 10));
  };

  

  return (
    isOpen && (
      <div className='bg-black z-50' style={modalStyles}>
        
        <div className='grid grid-cols-1' style={modalContentStyles}>
          <div className='ms-auto '>
        <button className='text-gray-500' onClick={onClose}>X</button>
        </div>
          <h2 className='py-2 px-10'>Select Number of Months</h2>
          <select onChange={handleChange}>
            <option value="0">0 Months</option>
            <option value="1">1 Month</option>
            <option value="2">2 Months</option>
            <option value="3">3 Months</option>
            <option value="4">4 Months</option>
            <option value="5">5 Months</option>
            <option value="6">6 Months</option>
            <option value="7">7 Months</option>
            <option value="8">8 Months</option>
            <option value="9">9 Months</option>
            <option value="10">10 Months</option>
            <option value="11">11 Months</option>
            <option value="12">12 Months</option>
          </select>
          <div className='mt-5'>
          <button className='bg-green-500 text-white font-bold rounded py-2 px-4' onClick={onStart}>Start</button>
          </div>
        </div>
      </div>
    )
  );
};

// Styles for the modal
const modalStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const modalContentStyles = {
  backgroundColor: 'white',
  padding: '10px',
  borderRadius: '8px',
  textAlign: 'center',
};

export default MonthSelectionModal;
