import React, { useState } from "react";
import { Star } from "lucide-react";

const Rating = ({ value = 0, onChange, max = 5, size = 24, scale = 1 }) => {
  const [hover, setHover] = useState(null);
  const computedSize = size * scale;

  return (
    <div className="flex space-x-1">
      {[...Array(max)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <Star
            key={index}
            size={computedSize}
            className={`cursor-pointer transition-all duration-200 ${
              ratingValue <= (hover || value) ? "fill-yellow-400 stroke-yellow-400" : "fill-gray-300 stroke-gray-300"
            }`}
            onClick={() => onChange && onChange(ratingValue)}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(null)}
          />
        );
      })}
    </div>
  );
};

export default Rating;
