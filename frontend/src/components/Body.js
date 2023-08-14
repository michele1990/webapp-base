import React, { useState } from 'react';

export default function Header({ username, setUsername, greeting, setGreeting, token, setToken, users, setUsers }) {


    return (
        <>
            <div className="container mt-4">
                {users.length > 0 && (
                    <div className="mb-4">
                        <h3>List of Users:</h3>
                        <ul>
                            {users.map((user, index) => (
                                <li key={index}>{user}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <div className="container mt-4">
                <div className="row">
                    <section className="col-md-4">
                        <h2>Section 1</h2>
                        <p>Content for section 1. You can replace this with your database data.</p>
                    </section>
                    <section className="col-md-4">
                        <h2>Section 2</h2>
                        <p>Content for section 2. You can replace this with your database data.</p>
                    </section>
                    <section className="col-md-4">
                        <h2>Section 3</h2>
                        <p>Content for section 3. You can replace this with your database data.</p>
                    </section>
                </div>
            </div>
        </>
    );
};
