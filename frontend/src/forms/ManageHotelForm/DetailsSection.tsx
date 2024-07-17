import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const DetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold mb-3">Dodaj hotel</h1>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Nazwa
        <input
          type="text"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("name", { required: "Pole jest wymagane" })}
        ></input>
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}
      </label>
      <div className="flex gap-4">
        <label className="text-gray-700 text-sm font-bold flex-1">
          Miasto
          <input
            type="text"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("city", { required: "Pole jest wymagane" })}
          ></input>
          {errors.city && (
            <span className="text-red-500">{errors.city.message}</span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Kraj
          <input
            type="text"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("country", { required: "Pole jest wymagane" })}
          ></input>
          {errors.country && (
            <span className="text-red-500">{errors.country.message}</span>
          )}
        </label>
      </div>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Opis
        <textarea
          rows={10}
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("description", { required: "Pole jest wymagane" })}
        ></textarea>
        {errors.description && (
          <span className="text-red-500">{errors.description.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold max-w-[50%]">
        Cena za noc
        <input
          type="number"
          min={1}
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("pricePerNight", { required: "Pole jest wymagane" })}
        ></input>
        {errors.pricePerNight && (
          <span className="text-red-500">{errors.pricePerNight.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold max-w-[50%]">
        Ocena
        <select
          {...register("starRating", {
            required: "Pole jest wymagane",
          })}
          className="border rounded w-full p-2 text-gray-700 font-normal"
        >
          <option value="" className="text-sm font-bold">
            Ocena
          </option>
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
        {errors.starRating && (
          <span className="text-red-500">{errors.starRating.message}</span>
        )}
      </label>
    </div>
  );
};

export default DetailsSection;
