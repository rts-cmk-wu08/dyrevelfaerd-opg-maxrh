import Modal from 'react-modal';
import Image from 'next/image'

const customStyles = {
    overlay: {
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
    },

    content: {
        position: 'relative',
        maxWidth: '600px',
        minHeight: '600px',
        inset: '0px',
        margin: '0 auto',
        padding: '0',
        border: 'none',
        borderRadius: '0',
        WebkitOverflowScrolling: 'touch',
        outline: 'none',
        cursor: 'auto',
        backgroundColor: 'transparent',
        overflow: 'visible',
    },
    
};

const AnimalModal = ({ isOpen, onClose, animal }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Animal Modal"
      ariaHideApp={false} // This is used to disable a11y warnings, handle it as needed
    >
      {/* Render the detailed information of the animal */}
      {/* Use the 'animal' prop to display the data */}
        <div className="container max-w-6xl mx-auto bg-white rounded overflow-hidden shadow-lg">
            <img className="w-full h-full object-cover" width="600" height="330" src={`${animal?.asset.url}`} alt="Sunset in the mountains" />
            <div className="flex-1  py-16 px-16">
                <h1 className="text-5xl mb-6 text-blue-900">{animal?.name}</h1>
                <p className="text-xl mb-6">{animal?.description}</p>
                <p className='text-xs text-gray-500'>Age: {animal?.age}</p>
            </div>
        </div>
    </Modal>
  );
};

export default AnimalModal;