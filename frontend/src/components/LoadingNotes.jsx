export default function LoadingNotes() {
  return (
    <div className='text-center py-10'>
      {/* main info */}
      <h3 className='text-lg text-primary mb-3'>Loading notes... ⏳</h3>

      {/* additional info */}
      <div className='text-sm text-base-content'>
        <p>Hi, thank you for visiting our web.</p>
        <p>
          At the moment we use free service to host our server, and it might
          take up to 50 seconds to wake up.
        </p>
        <p>So, I really appreciate your patience 😇</p>
      </div>
    </div>
  );
}
