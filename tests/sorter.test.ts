import { expect, test } from "vitest";
import { BitonicSorter } from "../src/sorter.js";
import { mockDevice } from "./mock_device.js";
test("instantiation", () => { const sorter = new BitonicSorter(mockDevice); expect(sorter).toBeDefined(); });