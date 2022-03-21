import { FormEvent, useState } from "react";

type FormState = {
  name: string;
  email: string;
  message: string;
};

export default () => {
  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setFormState({ ...formState, name: formState.name.toUpperCase() });

    // alert(JSON.stringify(formState, null, 2));
  }

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col items-center justify-center space-y-8">
      <form onSubmit={handleSubmit} className="flex flex-col w-1/5 space-y-4">
        <input
          type="text"
          value={formState.name}
          onChange={(event) =>
            setFormState({ ...formState, name: event.target.value })
          }
          placeholder="Your Name"
        />
        <input
          value={formState.email}
          type="email"
          placeholder="Your email"
          onChange={(event) =>
            setFormState({ ...formState, email: event.target.value })
          }
        />
        <textarea
          value={formState.message}
          placeholder="Your message"
          rows={6}
          onChange={(event) =>
            setFormState({ ...formState, message: event.target.value })
          }
        ></textarea>
        <button
          type="submit"
          className="bg-slate-600 hover:bg-slate-700 text-slate-100 py-3 rounded-md"
        >
          Submit Form
        </button>
      </form>
      <pre>{JSON.stringify(formState, null, 2)}</pre>
    </div>
  );
};
