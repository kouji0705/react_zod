import React, { useState } from 'react';
import { UserSchema } from './validator'
import { ZodError } from 'zod'

function App() {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [errors, setErrors] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Zod スキーマを使ってバリデーションを行う
      UserSchema.parse(formData);
      setErrors([]);
      alert('Form is valid!');
    } catch (error) {
      if (error instanceof ZodError) {
        // エラーメッセージを設定
        setErrors(error.errors.map(err => err.message));
      }
    }
  };
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
      {errors.length > 0 && (
        <ul>
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
