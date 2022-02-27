import React, { useState } from "react";
import type { NextPage } from "next";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const RIV: NextPage = () => {
  const meow = "meow";

  return (
    <article className="container grid mx-auto h-screen">
      Todo Test related field validation

      Field 1:
        Must be a currency (decimal)
        Required
        Must be larger than x
        Must be smaller than y

      Field 2:
        Must be a currency (decimal)
        Required
        Must not be 0
        Must be smaller than Field 1

      Field 3:
        Must be a currency (decimal)
        Optional

      Field 2 & 3:
        Must be at least x% of Field 1
        Field 2 must be larger than 3
    </article>
  )
};

export default RIV;
