"use client"

import simpleRestProvider from "ra-data-simple-rest"
import { Admin, ListGuesser, Resource } from "react-admin"

const dataProvider = simpleRestProvider("/api")

export default function App() {
    return (
        <Admin dataProvider={dataProvider}>
            <Resource 
                name="courses"
                list={ListGuesser}
                recordRepresentation="title"
            />
        </Admin>
    )
}