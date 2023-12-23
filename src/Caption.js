
// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import CanvasEditor from  './CanvasEditor'
// const Caption = () => {
//   const location = useLocation();
//   const { image, captionText } = location.state || {};
// //   const captionText = location.state?.captionText || 'Default Caption';

//   return (
//     <div>

//       <h1>{captionText}</h1>

//       {/* {image && (
//         <div>
//           <img src={image.urls.small} alt={image.alt_description} />
//         </div>
//       )}
//        */}

//       {image && <CanvasEditor image={image} />}
    
//     </div>


    
//   );
// }

// export default Caption;



import React from 'react';
import { useLocation } from 'react-router-dom';
import CanvasEditor from './CanvasEditor';

const Caption = () => {
  const location = useLocation();
  const { image, captionText } = location.state || {};

  return (
    <div>
      <h1>{captionText}</h1>
      {image && <CanvasEditor image={image} />}
    </div>
  );
}

export default Caption;

