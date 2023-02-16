import './auth.style.css';


export default function AuthTemplate(props) {

    return (
        <div>
            <div>
            <form onSubmitCapture= {props.authSubmit}>
                <h3 className="social">Admin panel</h3>
                <label htmlFor="Email">Email</label>
                <input type="text" placeholder="Email" id="Email" onChange = {(e) => props.updateInput('email',e.target.value)}/>
                <label htmlFor="password">Password</label>
                <input type="password" placeholder="Password" id="password" onChange = {(e) => props.updateInput('password',e.target.value)}/>
                <button type = "submit">Log In</button>
            </form>
        </div>
        </div>
                );

}