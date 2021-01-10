import React, { useContext } from "react";
import { RoomContext } from "../Context";
import Title from "../component/Title";

const getUnique = (items, value) => {
  return [...new Set(items.map((item) => item[value]))];
};

export default function RoomFilter({ rooms }) {
  const context = useContext(RoomContext);
  const {
    handleChange,
    type,
    capacity,
    price,
    minPrice,
    maxPrice,
    minSize,
    maxSize,
    breakfast,
    pets,
  } = context;
  // start of get type
  let returnType = getUnique(rooms, "type");
  returnType = ["all", ...returnType];
  returnType = returnType.map((item, index) => {
    return (
      <option key={index} value={item}>
        {item}
      </option>
    );
  });
  //end of get type
  //start of get capacity
  let returnCapacity = getUnique(rooms, "capacity");
  returnCapacity = returnCapacity.map((item, index) => {
    return (
      <option key={index} value={item}>
        {item}
      </option>
    );
  });

  //end of capacity
  return (
    <section className="filter-container">
      <Title title="search for rooms" />
      <form className="filter-form">
        {/* start select type */}
        <div className="form-group">
          <label htmlFor="type">room type</label>
          <select
            name="type"
            id="type"
            value={type}
            className="form-control"
            onChange={handleChange}
          >
            {returnType}
          </select>
        </div>
        {/* end of select type */}

        {/* start select capacity */}
        <div className="form-group">
          <label htmlFor="capacity">Guests</label>
          <select
            name="capacity"
            id="capacity"
            value={capacity}
            className="form-control"
            onChange={handleChange}
          >
            {returnCapacity}
          </select>
        </div>
        {/* end of select capacity */}

        {/* start of price */}
        <div className="form-group">
          <label htmlFor="price">room price ${price}</label>
          <input
            type="range"
            name="price"
            min={minPrice}
            max={maxPrice}
            id="price"
            value={price}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        {/* end of price */}

        {/* start of size filter */}
        <div className="form-group">
          <label htmlFor="size">room size</label>
          <div className="size-inputs">
            <input
              type="number"
              name="minSize"
              id="size"
              value={minSize}
              onChange={handleChange}
              className="size-input"
            />
            <input
              type="number"
              name="maxSize"
              id="size"
              value={maxSize}
              onChange={handleChange}
              className="size-input"
            />
          </div>
        </div>
        {/* end of size filter */}

        {/* extras */}
        <div className="form-group">
          <div className="single-extra">
            <input
              type="checkbox"
              name="breakfast"
              id="breakfast"
              checked={breakfast}
              onChange={handleChange}
            />
            <label htmlFor="breakfast">breakfast</label>
          </div>
          <div className="single-extra">
            <input
              type="checkbox"
              name="pets"
              id="pets"
              value={pets}
              onChange={handleChange}
            />
            <label htmlFor="pets">pets</label>
          </div>
        </div>
        {/* end of extras */}
      </form>
    </section>
  );
}
