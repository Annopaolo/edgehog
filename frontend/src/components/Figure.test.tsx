/*
  This file is part of Edgehog.

  Copyright 2021 SECO Mind

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

import React from "react";
import { render, waitFor } from "@testing-library/react";

import Figure from "./Figure";

const placeholderImage =
  "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 500' style='background-color:%23f8f8f8'%3e%3c/svg%3e";

it("renders correctly", () => {
  const { container } = render(<Figure />);
  expect(container.querySelector("img")).toBeInTheDocument();
});

it("renders the image if src is valid", () => {
  const validImage =
    "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
  const { container } = render(<Figure src={validImage} />);
  expect(container.querySelector("img")).toHaveAttribute("src", validImage);
});

it("renders a fallback image instead if src cannot be displayed", async () => {
  const invalidImage = "invalid";
  const { container } = render(<Figure src={invalidImage} />);
  await waitFor(() =>
    expect(container.querySelector("img")).toHaveAttribute("src", invalidImage)
  );
});

it("renders a fallback image if src is missing", () => {
  const { container } = render(<Figure />);
  expect(container.querySelector("img")).toHaveAttribute(
    "src",
    placeholderImage
  );
});
