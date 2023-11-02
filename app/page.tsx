"use client";

import { ChangeEvent } from "react";
import toast from "react-hot-toast";

export default function Home() {
  const handlelogin = async () => {
    const handleInput = document.querySelector(
      'input[name="handle"]'
    ) as HTMLInputElement;
    const pvtKeyInput = document.querySelector(
      'input[name="pvtKey"]'
    ) as HTMLInputElement;
    console.log("Handle:", handleInput?.value);
    console.log("Private Key:", pvtKeyInput?.value);

    const res = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        handle: handleInput?.value,
        pvtKey: pvtKeyInput?.value,
      }),
    });
    const data = await res.json();
    toast("Logged In", data);
  };

  const handledispatch = async () => {
    const handleInput = document.querySelector(
      'input[name="handle"]'
    ) as HTMLInputElement;
    console.log("Handle:", handleInput?.value);
    const body = JSON.stringify({
      handle: handleInput?.value,
    });
    const res = await fetch("http://localhost:8000/enable-dispatcher", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });
    const data = await res.json();
    if (data.status === "401") {
      toast.error("Unauthorized", data);
      return;
    }
    toast.success("Dispatcher Enabled", data);
  };

  const handleprofile = async () => {
    const handleInput = document.querySelector(
      'input[name="handle"]'
    ) as HTMLInputElement;
    const evmAddressInput = document.querySelector(
      'input[name="evmAddress"]'
    ) as HTMLInputElement;
    const pvtKeyInput = document.querySelector(
      'input[name="pvtKey"]'
    ) as HTMLInputElement;

    console.log("Handle:", handleInput.value);
    console.log("EVM Address:", evmAddressInput.value);
    console.log("Private Key:", pvtKeyInput.value);
    const body = JSON.stringify({
      handle: handleInput?.value,
      pvtKey: pvtKeyInput?.value,
      evmAddress: evmAddressInput?.value,
    });
    // JSON.stringify({
    //   handle: handleInput?.value,
    //   pvtKey: pvtKeyInput?.value,
    //   evmAddress: evmAddressInput?.value,
    // })
    const res = await fetch("http://localhost:8000/create-profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });
    const data = await res.json();
    toast("Profile Created", data);
  };

  const handlepost = async () => {
    const handleInput = document.querySelector(
      'input[name="text"]'
    ) as HTMLInputElement;

    console.log("Handle:", handleInput.value);
    const body = JSON.stringify({
      text: handleInput?.value,
    });
    const res = await fetch("http://localhost:8000/create-post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });
    const data = await res.json();
    toast("Post Created", data);
  };
  return (
    <main className=" text-black">
      <div className="flex flex-col mx-52">
        <h1 className="text-3xl font-bold items-center justify-center flex">
          Create Profile
        </h1>
        <form className=" flex flex-col space-y-3 mb-2">
          <input type="text" name="handle" placeholder="handle" />
          <input type="text" name="evmAddress" placeholder="evmAddress" />
          <input type="text" name="pvtKey" placeholder="pvtKey" />
        </form>
        <button
          onClick={handleprofile}
          className=" bg-white px-2 py-1 text-black relative"
        >
          create-profile
        </button>
      </div>
      <div className="flex flex-col mx-52">
        <h1 className="text-3xl font-bold items-center justify-center flex">
          login
        </h1>
        <form action="post" className=" flex flex-col space-y-3 mb-2">
          <input type="text" name="handle" placeholder="handle" />
          <input type="text" name="pvtKey" placeholder="pvtKey" />
        </form>
        <button
          onClick={handlelogin}
          className=" bg-white px-2 py-1 text-black relative"
        >
          login
        </button>
      </div>

      <div className="flex flex-col mx-52">
        <h1 className="text-3xl font-bold items-center justify-center flex">
          Enable Dispatcher
        </h1>
        <form action="post" className=" flex flex-col space-y-3 mb-2">
          <input type="text" name="handle" placeholder="handle" />
        </form>
        <button
          onClick={handledispatch}
          type="submit"
          className=" bg-white px-2 py-1 text-black relative"
        >
          Enable Dispatcher
        </button>
      </div>
      <div className="flex flex-col mx-52">
        <h1 className="text-3xl font-bold items-center justify-center flex">
          Post on LP
        </h1>
        <form action="post" className=" flex flex-col space-y-3 mb-2">
          <input type="text" name="text" placeholder="content URI" />
        </form>
        <button
          onClick={handlepost}
          className=" bg-white px-2 py-1 text-black relative"
        >
          post
        </button>
      </div>
    </main>
  );
}
