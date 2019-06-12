import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components'




class Artist extends Component {
    state = {
        showForm: false,
        formInfo: {
            name: '',
            dob: '',
            ethnicity: '',
            location: '',
            _id: ''
        }
    }
    componentDidMount() {
        let copyOfFormInfo = this.state.formInfo
        copyOfFormInfo.name = this.props.name
        copyOfFormInfo.dob = this.props.dob
        copyOfFormInfo.ethnicity = this.props.ethnicity
        copyOfFormInfo.location = this.props.location
        copyOfFormInfo._id = this.props._id
        this.setState({
            formInfo: copyOfFormInfo
        })
    }

    deleteArtist = () => {
        console.log(this.props._id)
        axios.delete(`api/v1/artist/${this.props._id}`)
        this.props.getArtists()
    }

    updateArtist = (e) => {
        e.preventDefault()
        console.log(this.state.formInfo)
        axios.put(`/api/v1/artist/${this.props._id}`, this.state.formInfo)
        this.swapForm()
        this.props.getArtists()
    }

    handleChange = (e) => {
        const copyOfFormInfo = { ...this.state.formInfo }
        copyOfFormInfo[e.target.name] = e.target.value
        this.setState({ formInfo: copyOfFormInfo })
    }

    swapForm = () => {
        this.setState({ showForm: !this.state.showForm })
    }

    render() {
        return (
            <div>
                {this.state.showForm
                    ? <form onSubmit={this.updateArtist}>
                        <label htmlFor="name">Name:</label>
                        <input id="name" name="name" type="text" placeholder={this.props.name} onChange={this.handleChange} />
                        <label htmlFor="dob">DOB:</label>
                        <input id="dob" name="dob" type="text" placeholder={this.props.dob} onChange={this.handleChange} />
                        <label htmlFor="ethnicity">Ethnicity:</label>
                        <input id="ethnicity" name="ethnicity" type="text" placeholder={this.props.ethnicity} onChange={this.handleChange} />
                        <label htmlFor="location">Location:</label>
                        <input id="location" name="location" type="text" placeholder={this.props.location} onChange={this.handleChange} />
                        <button onClick={this.setState.swapForm} >Submit Edit!</button>
                    </form>
                    : <info>
                        <p>Name: {this.props.name}</p>
                        <p>DOB: {this.props.dob}</p>
                        <p>Ethnicity: {this.props.ethnicity}</p>
                        <p>Location: {this.props.location}</p>
                        <p>Photo1: {this.props.photo1}</p>
                        <img src={this.props.photo1}/>
                        <button onClick={this.swapForm}>Edit Artist</button>
                        <button onClick={this.deleteArtist}>Delete Artist</button>
                    </info>
                }
            </div>
        );
    }
}

export default Artist;