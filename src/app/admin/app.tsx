"use client"

import simpleRestProvider from "ra-data-simple-rest"
import { Admin, Resource } from "react-admin"
import { CourseList } from "./course/list"
import { CourseCreate } from "./course/create"
import { CourseEdit } from "./course/edit"

const dataProvider = simpleRestProvider("/api")

export default function App() {
    return (
        <Admin dataProvider={dataProvider}>
            <Resource 
                name="courses"
                list={CourseList}
                create={CourseCreate}
                edit={CourseEdit}
                recordRepresentation="title"
            />
        </Admin>
    )
}