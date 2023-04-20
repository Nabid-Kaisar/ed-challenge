import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { IATA } from "../models/IATAType";
import Input from "../components/common/Input";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 800px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.15);
  background-color: #f9f9f9;

  @media (min-width: 768px) {
    padding: 30px;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const InputLabel = styled.label`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;
  color: #444;
`;

const InputField = styled.input`
  font-size: 16px;
  padding: 10px 15px;
  border-radius: 5px;
  border: none;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  width: 100%;
  margin-bottom: 10px;
  background-color: #f5f5f5;
  color: #333;

  &::placeholder {
    color: #999;
  }

  &:focus {
    outline: none;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  }

  @media (min-width: 768px) {
    margin-right: 20px;
    margin-bottom: 0;
    width: calc(50% - 10px);
  }
`;

const SubmitButton = styled.button`
  font-size: 16px;
  font-weight: 600;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  background-color: #0077cc;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #005fa3;
  }

  &:focus {
    outline: none;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  }
`;

const FlightSelectionForm = ({
  handleCallPromotionPricesApi,
}: FlightSelectionFormProps) => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Origin:", origin);
    console.log("Destination:", destination);
    handleCallPromotionPricesApi(origin as IATA, destination as IATA);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div>
          <Input
            label={"Origin"}
            type="text"
            id="origin"
            name="origin"
            value={origin}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setOrigin(event.target.value)
            }
            required
          />
        </div>
        <div>
          <Input
            label={"Destination"}
            type="text"
            id="destination"
            name="destination"
            value={destination}
            onChange={(event: any) => setDestination(event.target.value)}
            required
          />
        </div>
        <button type="submit">Search Flights</button>
      </form>
    </div>
  );
};

export default FlightSelectionForm;

interface FlightSelectionFormProps {
  handleCallPromotionPricesApi: (
    origin: IATA,
    destination: IATA
  ) => Promise<void>;
}
