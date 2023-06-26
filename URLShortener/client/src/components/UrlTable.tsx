import React, {useLayoutEffect, useState} from 'react';
import {UrlAddress, UrlCredentials} from "../types/UrlAddress";
import {useNavigate} from "react-router";
import {default as testData} from "./testData.json"
import {useAuth} from "../hooks/useAuth";
import {useAppDispatch, useAppSelector} from "../hooks/useAppDispatch";
import {
    createUrlAddressAction,
    deleteUrlAddressAction,
    fetchUrlAddressListAction
} from "../store/UrlAddress/UrlAddress.slice";

const UrlTable = () => {
    // const urls = testData as UrlAddress[]
    const {urlAddressList} = useAppSelector(state => state.urlAddress)

    const [inputUrl, setInputUrl] = useState<string>("")

    const dispatch = useAppDispatch()
    useLayoutEffect(()=> {
        dispatch(fetchUrlAddressListAction())
    },[])

    const navigate = useNavigate()

    const auth = useAuth()

    const handleDeleteLink = (url: UrlAddress) => {
        dispatch(deleteUrlAddressAction(url))
    }

    const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputUrl(e.target.value)
    }

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (auth.state?.user) {
            console.warn({originalUrl: inputUrl, userCreatorId: auth.state?.user.id})
            dispatch(createUrlAddressAction({originalUrl: inputUrl, userCreatorId: auth.state?.user.id} as UrlCredentials))
        }
    }

    const navigateToLinkDetails = (id: string) => {
        navigate(`/link/?id=${id}`)
    }

    console.log(urlAddressList)
    return (
        <section>
            {
                !!auth.state?.user &&
                <form onSubmit={handleFormSubmit}>
                    <input onChange={handleInputOnChange} placeholder="Link..." type="text"/>
                    <button type="submit">Cut down</button>
                </form>
            }
            <table>
                <thead>
                <tr>
                    <th>Short Link</th>
                    <th>Original Link</th>
                    {/*<th>User</th>*/}
                    {!!auth.state?.user && <th/>}
                </tr>
                </thead>
                <tbody>
                {
                    urlAddressList.map((value) =>
                        <tr onClick={() => {
                            navigateToLinkDetails(value.id)
                        }} key={value.id}>
                            <td>{value.shortUrl}</td>
                            <td>{value.originalUrl}</td>
                            {/*<td>{value.userCreator.email}</td>*/}
                            {
                                !!auth.state?.user &&
                                <td>
                                    <button className={"delete-btn"} onClick={() => {
                                        handleDeleteLink(value)
                                    }}>Delete
                                    </button>
                                </td>
                            }
                        </tr>
                    )
                }
                </tbody>
            </table>
        </section>
    );
};

export default UrlTable;