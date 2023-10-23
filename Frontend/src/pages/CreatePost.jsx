import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import {ImCross} from 'react-icons/im'
import { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { URL } from '../url'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'
import SideNavbar from "../components/sidenav";

function CreatePost() {
    const [title,setTitle]=useState("")
    const [description,setDescription]=useState("")
    const [country,setCountry]=useState("")
    const [city,setCity]=useState("")
    const [subregion,setSubregion]=useState("")
    const [continent,setContinent]=useState("")
    const [file,setFile]=useState(null)
    const {user}=useContext(UserContext)
    const [cat,setCat]=useState("")
    const [cats,setCats]=useState([])

    const navigate=useNavigate()

    function addCategory() {
        let updatedCats = [...cats]
        updatedCats.push(cat)
        setCat('')
        setCats(updatedCats)
    }
    function deleteCategory(i) {
        let updatedCats = [...cats]
        updatedCats.splice(i)
        setCats(updatedCats)
    }

    async function handleCreate(e) {
        e.preventDefault()
        const post={
          title,
          description,
          continent,
          subregion,
          country,
          username:user.username,
          userId:user._id,
          catagories:cats
        }

        if(file){
          const data=new FormData()
          const filename=Date.now()+file.name
          data.append("img",filename)
          data.append("file",file)
          post.photo=filename
          // console.log(data)
          //img upload
          try{
            const imgUpload=await axios.post(URL+"/api/upload",data)
            // console.log(imgUpload.data)
          }
          catch(err){
            console.log(err)
          }
        }
        //post upload
        // console.log(post)
        try{
          const res=await axios.post(URL+"/api/posts/create",post,{withCredentials:true})
          navigate("/posts/post/"+res.data._id)
          // console.log(res.data)

        }
        catch(err){
          console.log(err)
        }
    }

    return (
      <div className="fullPage">
        <SideNavbar />
        <div className="mainSection">
            <Navbar/>
            <div className='px-6 md:px-[200px] mt-8'>
                <h1 className='font-bold md:text-2xl text-xl '>Create a post</h1>
                <form className='w-full flex flex-col space-y-4 md:space-y-8 mt-4'>
                    <input onChange={(e)=>setTitle(e.target.value)} type="text" placeholder='Enter post title' className='blk px-4 py-2 outline-none'/>
                    <input onChange={(e)=>setFile(e.target.files[0])} type="file"  className='px-4'/>
                    <div className='flex flex-col'>
                        <div className='flex items-center space-x-4 md:space-x-8'>
                            <input value={cat} onChange={(e)=>setCat(e.target.value)} className='blk px-4 py-2 outline-none' placeholder='Enter post category' type="text"/>
                            <div onClick={addCategory} className='bg-black text-white px-4 py-2 font-semibold cursor-pointer'>Add</div>
                        </div>

                        <div className='flex px-4 mt-3'>
                            {cats?.map((c,i)=>(
                                <div key={i} className='flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md'>
                                    <p>{c}</p>
                                    <p onClick={deleteCategory} className='text-white bg-black rounded-full cursor-pointer p-1 text-sm'><ImCross/></p>
                                </div>                                
                            ))}
                        </div>
                    </div>
                    <textarea onChange={(e)=>setDescription(e.target.value)} className='blk px-4 py-2 outline-none h-96' placeholder='Enter post'/>
                    <div>
                      <label htmlFor="Continent">Continent Visited</label>
                      <select id="Continent" name="Continent" className="ml-4" onChange={(e)=>setContinent(e.target.value)}>
                        <option>Choose Continent</option>
                        <option value="Africa">Africa</option>
                        <option value="Europe">Europe</option>
                        <option value="Asia">Asia</option>
                        <option value="Oceania">Oceania</option>
                        <option value="South America">South America</option>
                        <option value="North America">North America</option>
                        <option value="Antarctica">Antarctica</option>
                      </select>
                    </div>

                    {/* AFRICA START */}
                    <>
                      {continent==="Africa" && <div>
                        <label htmlFor="coffee">Part of Africa</label>
                        <select id="Part of Africa" name="Part of Africa" className="blk ml-4" onChange={(e)=>setSubregion(e.target.value)}>
                          <option>Choose Region</option>
                          <option value="Northern Africa">Northern Africa</option>
                          <option value="Eastern Africa">Eastern Africa</option>
                          <option value="Central Africa">Central Africa</option>
                          <option value="Southern Africa">Southern Africa</option>
                          <option value="Western Africa">Western Africa</option>
                        </select>
                      </div>}
                      {continent==="Africa" && subregion==="Northern Africa" && <div>
                        <label htmlFor="Country">Country</label>
                        <select id="Country" name="Country" className="blk ml-4" onChange={(e)=>setCountry(e.target.value)}>
                          <option>Choose Country</option>
                          <option value="Algeria">Algeria</option>
                          <option value="Egypt">Egypt</option>
                          <option value="Libya">Libya</option>
                          <option value="Morocco">Morocco</option>
                          <option value="Sudan">Sudan</option>
                          <option value="Tunisia">Tunisia</option>
                          <option value="Western Sahara">Western Sahara</option>
                        </select>
                      </div>}
                      {continent==="Africa" && subregion==="Eastern Africa" && <div>
                        <label htmlFor="Country">Country</label>
                        <select id="Country" name="Country" className="blk ml-4" onChange={(e)=>setCountry(e.target.value)}>
                          <option>Choose Country</option>
                          <option value="Burundi">Burundi</option>
                          <option value="Comoros">Comoros</option>
                          <option value="Djibouti">Djibouti</option>
                          <option value="Eritrea">Eritrea</option>
                          <option value="Ethiopia">Ethiopia</option>
                          <option value="Kenya">Kenya</option>
                          <option value="Madagascar">Madagascar</option>
                          <option value="Malawi">Malawi</option>
                          <option value="Mauritius">Mauritius</option>
                          <option value="Mozambique">Mozambique</option>
                          <option value="Rwanda">Rwanda</option>
                          <option value="Seychelles">Seychelles</option>
                          <option value="Somalia">Somalia</option>
                          <option value="South Sudan">South Sudan</option>
                          <option value="Tanzania">Tanzania</option>
                          <option value="Uganda">Uganda</option>
                          <option value="Zambia">Zambia</option>
                          <option value="Zimbabwe">Zimbabwe</option>
                        </select>
                      </div>}
                      {continent==="Africa" && subregion==="Central Africa" && <div>
                        <label htmlFor="Country">Country</label>
                        <select id="Country" name="Country" className="blk ml-4" onChange={(e)=>setCountry(e.target.value)}>
                          <option>Choose Country</option>
                          <option value="Angola">Angola</option>
                          <option value="Cameroon">Cameroon</option>
                          <option value="Southern Europen Republic">Southern Europen Republic</option>
                          <option value="Chad">Chad</option>
                          <option value="Democratic Republic of the Congo">Democratic Republic of the Congo</option>
                          <option value="Republic of the Congo">Republic of the Congo</option>
                          <option value="Equatorial Guinea">Equatorial Guinea</option>
                          <option value="Gabon">Gabon</option>
                          <option value="São Tomé and Príncipe">São Tomé and Príncipe</option>
                        </select>
                      </div>}
                      {continent==="Africa" && subregion==="Southern Africa" && <div>
                        <label htmlFor="Country">Country</label>
                        <select id="Country" name="Country" className="blk ml-4" onChange={(e)=>setCountry(e.target.value)}>
                          <option>Choose Country</option>
                          <option value="Botswana">Botswana</option>
                          <option value="Eswatini">Eswatini</option>
                          <option value="Lesotho">Lesotho</option>
                          <option value="Namibia">Namibia</option>
                          <option value="South Africa">South Africa</option>
                        </select>
                      </div>}
                      {continent==="Africa" && subregion==="Western Africa" && <div>
                        <label htmlFor="Country">Country</label>
                        <select id="Country" name="Country" className="blk ml-4" onChange={(e)=>setCountry(e.target.value)}>
                          <option>Choose Country</option>
                          <option value="Benin">Benin</option>
                          <option value="Burkina Faso">Burkina Faso</option>
                          <option value="Cape Verde">Cape Verde</option>
                          <option value="Côte d'Ivoire">Côte d'Ivoire</option>
                          <option value="Gambia">Gambia</option>
                          <option value="Ghana">Ghana</option>
                          <option value="Guinea">Guinea</option>
                          <option value="Guinea-Bissau">Guinea-Bissau</option>
                          <option value="Liberia">Liberia</option>
                          <option value="Mali">Mali</option>
                          <option value="Mauritania">Mauritania</option>
                          <option value="Niger">Niger</option>
                          <option value="Nigeria">Nigeria</option>
                          <option value="Senegal">Senegal</option>
                          <option value="Sierra Leone">Sierra Leone</option>
                          <option value="Togo">Togo</option>
                        </select>
                      </div>}
                    </>

                    {/* EUROPE START */}
                    <>
                      {continent==="Europe" && <div>
                        <label htmlFor="coffee">Part of Europe</label>
                        <select id="Part of Europe" name="Part of Europe" className="blk ml-4" onChange={(e)=>setSubregion(e.target.value)}>
                          <option>Choose Region</option>
                          <option value="Eastern Europe">Eastern Europe</option>
                          <option value="Northern Europe">Northern Europe</option>
                          <option value="Southern Europe">Southern Europe</option>
                          <option value="Western Europe">Western Europe</option>
                        </select>
                      </div>}
                      {continent==="Europe" && subregion==="Eastern Europe" && <div>
                        <label htmlFor="Country">Country</label>
                        <select id="Country" name="Country" className="blk ml-4" onChange={(e)=>setCountry(e.target.value)}>
                          <option>Choose Country</option>
                          <option value="Belarus">Belarus</option>
                          <option value="Bulgaria">Bulgaria</option>
                          <option value="Czechia">Czechia</option>
                          <option value="Hungary">Hungary</option>
                          <option value="Poland">Poland</option>
                          <option value="Republic of Moldova">Republic of Moldova</option>
                          <option value="Romania">Romania</option>
                          <option value="Russia">Russia</option>
                          <option value="Slovakia">Slovakia</option>
                          <option value="Ukraine">Ukraine</option>
                        </select>
                      </div>}
                      {continent==="Europe" && subregion==="Northern Europe" && <div>
                        <label htmlFor="Country">Country</label>
                        <select id="Country" name="Country" className="blk ml-4" onChange={(e)=>setCountry(e.target.value)}>
                          <option>Choose Country</option>
                          <option value="Denmark">Denmark</option>
                          <option value="Estonia">Estonia</option>
                          <option value="Finland">Finland</option>
                          <option value="Iceland">Iceland</option>
                          <option value="Ireland">Ireland</option>
                          <option value="Latvia">Latvia</option>
                          <option value="Lithuania">Lithuania</option>
                          <option value="Norway">Norway</option>
                          <option value="Sweden">Sweden</option>
                          <option value="United Kingdom">United Kingdom</option>
                        </select>
                      </div>}
                      {continent==="Europe" && subregion==="Southern Europe" && <div>
                        <label htmlFor="Country">Country</label>
                        <select id="Country" name="Country" className="blk ml-4" onChange={(e)=>setCountry(e.target.value)}>
                          <option>Choose Country</option>
                          <option value="Albania">Albania</option>
                          <option value="Andorra">Andorra</option>
                          <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                          <option value="Croatia">Croatia</option>
                          <option value="Greece">Greece</option>
                          <option value="Italy">Italy</option>
                          <option value="Malta">Malta</option>
                          <option value="Montenegro">Montenegro</option>
                          <option value="North Macedonia">North Macedonia</option>
                          <option value="San Marino">San Marino</option>
                          <option value="Serbia">Serbia</option>
                          <option value="Slovenia">Slovenia</option>
                        </select>
                      </div>}
                      {continent==="Europe" && subregion==="Western Europe" && <div>
                        <label htmlFor="Country">Country</label>
                        <select id="Country" name="Country" className="blk ml-4" onChange={(e)=>setCountry(e.target.value)}>
                          <option>Choose Country</option>
                          <option value="Austria">Austria</option>
                          <option value="Belgium">Belgium</option>
                          <option value="France">France</option>
                          <option value="Germany">Germany</option>
                          <option value="Liechtenstein">Liechtenstein</option>
                          <option value="Luxembourg">Luxembourg</option>
                          <option value="Monaco">Monaco</option>
                          <option value="Netherlands">Netherlands</option>
                          <option value="Portugal">Portugal</option>
                          <option value="Spain">Spain</option>
                          <option value="Switzerland">Switzerland</option>
                        </select>
                      </div>}
                    </>

                    {/* OCEANIA START */}
                    <>
                      {continent==="Oceania" && <div>
                        <label htmlFor="coffee">Part of Oceania</label>
                        <select id="Part of Oceania" name="Part of Oceania" className="blk ml-4" onChange={(e)=>setSubregion(e.target.value)}>
                          <option>Choose Region</option>
                          <option value="Australia and New Zealand">Australia and New Zealand</option>
                          <option value="Melanesia">Melanesia</option>
                          <option value="Micronesia">Micronesia</option>
                          <option value="Polynesia">Polynesia</option>
                        </select>
                      </div>}
                      {continent==="Oceania" && subregion==="Australia and New Zealand" && <div>
                        <label htmlFor="Country">Country</label>
                        <select id="Country" name="Country" className="blk ml-4" onChange={(e)=>setCountry(e.target.value)}>
                          <option>Choose Country</option>
                          <option value="Australia">Australia</option>
                          <option value="New Zealand">New Zealand</option>
                        </select>
                      </div>}
                      {continent==="Oceania" && subregion==="Melanesia" && <div>
                        <label htmlFor="Country">Country</label>
                        <select id="Country" name="Country" className="blk ml-4" onChange={(e)=>setCountry(e.target.value)}>
                          <option>Choose Country</option>
                          <option value="Fiji">Fiji</option>
                          <option value="New Caledonia">New Caledonia</option>
                          <option value="Papua New Guinea">Papua New Guinea</option>
                          <option value="Solomon Islands">Solomon Islands</option>
                          <option value="Vanuatu">Vanuatu</option>
                        </select>
                      </div>}
                      {continent==="Oceania" && subregion==="Micronesia" && <div>
                        <label htmlFor="Country">Country</label>
                        <select id="Country" name="Country" className="blk ml-4" onChange={(e)=>setCountry(e.target.value)}>
                          <option>Choose Country</option>
                          <option value="Guam">Guam</option>
                          <option value="Kiribati">Kiribati</option>
                          <option value="Marshall Islands">Marshall Islands</option>
                          <option value="Micronesia">Micronesia</option>
                          <option value="Nauru">Nauru</option>
                          <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                          <option value="Palau">Palau</option>
                        </select>
                      </div>}
                      {continent==="Oceania" && subregion==="Polynesia" && <div>
                        <label htmlFor="Country">Country</label>
                        <select id="Country" name="Country" className="blk ml-4" onChange={(e)=>setCountry(e.target.value)}>
                          <option>Choose Country</option>
                          <option value="American Samoa">American Samoa</option>
                          <option value="Cook Islands">Cook Islands</option>
                          <option value="French Polynesia">French Polynesia</option>
                          <option value="Niue">Niue</option>
                          <option value="Pitcairn">Pitcairn</option>
                          <option value="Samoa">Samoa</option>
                          <option value="Tokelau">Tokelau</option>
                          <option value="Tonga">Tonga</option>
                          <option value="Tuvalu">Tuvalu</option>
                          <option value="Wallis and Futuna Islands">Wallis and Futuna Islands</option>
                        </select>
                      </div>}
                    </>

                    {/* North America START */}
                    <>
                      {continent==="North America" && <div>
                        <label htmlFor="coffee">Part of North America</label>
                        <select id="Part of North America" name="Part of North America" className="blk ml-4" onChange={(e)=>setSubregion(e.target.value)}>
                          <option>Choose Region</option>
                          <option value="Northern America">Northern America</option>
                          <option value="Central America">Central America</option>
                          <option value="The Caribbean">The Caribbean</option>
                        </select>
                      </div>}
                      {continent==="North America" && subregion==="Northern America" && <div>
                        <label htmlFor="Country">Country</label>
                        <select id="Country" name="Country" className="blk ml-4" onChange={(e)=>setCountry(e.target.value)}>
                          <option>Choose Country</option>
                          <option value="Canada">Canada</option>
                          <option value="United States of America">United States of America</option>
                          <option value="Mexico">Mexico</option>
                        </select>
                      </div>}
                      {continent==="North America" && subregion==="Central America" && <div>
                        <label htmlFor="Country">Country</label>
                        <select id="Country" name="Country" className="blk ml-4" onChange={(e)=>setCountry(e.target.value)}>
                          <option>Choose Country</option>
                          <option value="Belize">Belize</option>
                          <option value="Costa Rica">Costa Rica</option>
                          <option value="El Salvador">El Salvador</option>
                          <option value="Guatemala">Guatemala</option>
                          <option value="Honduras">Honduras</option>
                          <option value="Nicaragua">Nicaragua</option>
                          <option value="Panama">Panama</option>
                        </select>
                      </div>}
                      {continent==="North America" && subregion==="The Caribbean" && <div>
                        <label htmlFor="Country">Country</label>
                        <select id="Country" name="Country" className="blk ml-4" onChange={(e)=>setCountry(e.target.value)}>
                          <option>Choose Country</option>
                          <option value="Anguilla">Anguilla</option>
                          <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                          <option value="Aruba">Aruba</option>
                          <option value="The Bahamas">The Bahamas</option>
                          <option value="Barbados">Barbados</option>
                          <option value="Bay Islands Department">Bay Islands Department</option>
                          <option value="Belize">Belize</option>
                          <option value="Bocas del Toro Province">Bocas del Toro Province</option>
                          <option value="Bonaire">Bonaire</option>
                          <option value="British Virgin Islands">British Virgin Islands</option>
                          <option value="Cayman Islands">Cayman Islands</option>
                          <option value="Cuba">Cuba</option>
                          <option value="Curaçao">Curaçao</option>
                          <option value="Dominica">Dominica</option>
                          <option value="Dominican Republic">Dominican Republic</option>
                          <option value="Federal Dependencies of Venezuela">Federal Dependencies of Venezuela</option>
                          <option value="French Guiana">French Guiana</option>
                          <option value="Grenada">Grenada</option>
                          <option value="Guadeloupe">Guadeloupe</option>
                          <option value="Guna Yala">Guna Yala</option>
                          <option value="Guyana">Guyana</option>
                          <option value="Haiti">Haiti</option>
                          <option value="Jamaica">Jamaica</option>
                          <option value="Martinique">Martinique</option>
                          <option value="Montserrat">Montserrat</option>
                          <option value="Navassa Island">Navassa Island</option>
                          <option value="Nueva Esparta">Nueva Esparta</option>
                          <option value="Puerto Rico">Puerto Rico</option>
                          <option value="Quintana Roo">Quintana Roo</option>
                          <option value="Saba">Saba</option>
                          <option value="San Andrés and Providencia">San Andrés and Providencia</option>
                          <option value="Saint Barthélemy">Saint Barthélemy</option>
                          <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                          <option value="Saint Lucia">Saint Lucia</option>
                          <option value="Saint Martin">Saint Martin</option>
                          <option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option>
                          <option value="Sint Eustatius">Sint Eustatius</option>
                          <option value="Sint Maarten">Sint Maarten</option>
                          <option value="Suriname">Suriname</option>
                          <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                          <option value="Turks and Caicos Islands">Turks and Caicos Islands</option>
                          <option value="United States Virgin Islands">United States Virgin Islands</option>
                        </select>
                      </div>}
                    </>

                    {/* ASIA START */}
                    <>
                      {continent==="Asia" && <div>
                        <label htmlFor="coffee">Part of Asia</label>
                        <select id="Part of Asia" name="Part of Asia" className="blk ml-4" onChange={(e)=>setSubregion(e.target.value)}>
                          <option>Choose Region</option>
                          <option value="Central Asia">Central Asia</option>
                          <option value="Eastern Asia">Eastern Asia</option>
                          <option value="South-eastern Asia">South-eastern Asia</option>
                          <option value="Southern Asia">Southern Asia</option>
                          <option value="Middle East">Middle East</option>
                        </select>
                      </div>}
                      {continent==="Asia" && subregion==="Central Asia" && <div>
                        <label htmlFor="Country">Country</label>
                        <select id="Country" name="Country" className="blk ml-4" onChange={(e)=>setCountry(e.target.value)}>
                          <option>Choose Country</option>
                          <option value="Kazakhstan">Kazakhstan</option>
                          <option value="Kyrgyzstan">Kyrgyzstan</option>
                          <option value="Tajikistan">Tajikistan</option>
                          <option value="Turkmenistan">Turkmenistan</option>
                          <option value="Uzbekistan">Uzbekistan</option>
                        </select>
                      </div>}
                      {continent==="Asia" && subregion==="Eastern Asia" && <div>
                        <label htmlFor="Country">Country</label>
                        <select id="Country" name="Country" className="blk ml-4" onChange={(e)=>setCountry(e.target.value)}>
                          <option>Choose Country</option>
                          <option value="China">China</option>
                          <option value="North Korea">North Korea</option>
                          <option value="Japan">Japan</option>
                          <option value="Mongolia">Mongolia</option>
                          <option value="South Korea">South Korea</option>
                          <option value="Taiwan">Taiwan</option>
                        </select>
                      </div>}
                      {continent==="Asia" && subregion==="South-eastern Asia" && <div>
                        <label htmlFor="Country">Country</label>
                        <select id="Country" name="Country" className="blk ml-4" onChange={(e)=>setCountry(e.target.value)}>
                          <option>Choose Country</option>
                          <option value="Brunei">Brunei</option>
                          <option value="Cambodia">Cambodia</option>
                          <option value="Indonesia">Indonesia</option>
                          <option value="Laos">Laos</option>
                          <option value="Malaysia">Malaysia</option>
                          <option value="Myanmar">Myanmar</option>
                          <option value="Philippines">Philippines</option>
                          <option value="Singapore">Singapore</option>
                          <option value="Thailand">Thailand</option>
                          <option value="Timor-Leste">Timor-Leste</option>
                          <option value="Vietnam">Vietnam</option>
                        </select>
                      </div>}
                      {continent==="Asia" && subregion==="Southern Asia" && <div>
                        <label htmlFor="Country">Country</label>
                        <select id="Country" name="Country" className="blk ml-4" onChange={(e)=>setCountry(e.target.value)}>
                          <option>Choose Country</option>
                          <option value="Afghanistan">Afghanistan</option>
                          <option value="Bangladesh">Bangladesh</option>
                          <option value="Bhutan">Bhutan</option>
                          <option value="India">India</option>
                          <option value="Iran">Iran</option>
                          <option value="Maldives">Maldives</option>
                          <option value="Nepal">Nepal</option>
                          <option value="Pakistan">Pakistan</option>
                          <option value="Sri Lanka">Sri Lanka</option>
                        </select>
                      </div>}
                      {continent==="Asia" && subregion==="Middle East" && <div>
                        <label htmlFor="Country">Country</label>
                        <select id="Country" name="Country" className="blk ml-4" onChange={(e)=>setCountry(e.target.value)}>
                          <option>Choose Country</option>
                          <option value="Armenia">Armenia</option>
                          <option value="Azerbaijan">Azerbaijan</option>
                          <option value="Bahrain">Bahrain</option>
                          <option value="Cyprus">Cyprus</option>
                          <option value="Georgia">Georgia</option>
                          <option value="Iraq">Iraq</option>
                          <option value="Israel">Israel</option>
                          <option value="Jordan">Jordan</option>
                          <option value="Kuwait">Kuwait</option>
                          <option value="Lebanon">Lebanon</option>
                          <option value="Oman">Oman</option>
                          <option value="Qatar">Qatar</option>
                          <option value="Saudi Arabia">Saudi Arabia</option>
                          <option value="Palestine">Palestine</option>
                          <option value="Syria">Syria</option>
                          <option value="Turkey">Turkey</option>
                          <option value="United Arab Emirates">United Arab Emirates</option>
                          <option value="Yemen">Yemen</option>
                        </select>
                      </div>}
                    </>

                    {/* South America START */}
                    <>
                      {continent==="South America" && <div>
                        <label htmlFor="coffee">Part of South America</label>
                        <select id="Part of South America" name="Part of South America" className="blk ml-4" onChange={(e)=>setSubregion(e.target.value)}>
                          <option>Choose Region</option>
                          <option value="South America">South America</option>
                        </select>
                      </div>}
                      {continent==="South America" && subregion==="South America" && <div>
                        <label htmlFor="Country">Country</label>
                        <select id="Country" name="Country" className="blk ml-4" onChange={(e)=>setCountry(e.target.value)}>
                          <option>Choose Country</option>
                          <option value="Argentina">Argentina</option>
                          <option value="Bolivia">Bolivia</option>
                          <option value="Brazil">Brazil</option>
                          <option value="Chile">Chile</option>
                          <option value="Colombia">Colombia</option>
                          <option value="Ecuador">Ecuador</option>
                          <option value="Falkland Islands">Falkland Islands</option>
                          <option value="French Guiana">French Guiana</option>
                          <option value="Guyana">Guyana</option>
                          <option value="Paraguay">Paraguay</option>
                          <option value="Peru">Peru</option>
                          <option value="South Georgia and the South Sandwich Islands">South Georgia and the South Sandwich Islands</option>
                          <option value="Suriname">Suriname</option>
                          <option value="Uruguay">Uruguay</option>
                          <option value="Venezuela">Venezuela</option>
                        </select>
                      </div>}
                    </>

                    {/* Antarctica START */}
                    <>
                      {continent==="Antarctica" && <div>
                        <label htmlFor="Antarctica">Part of Antarctica</label>
                        <select id="Part of Antarctica" name="Part of Antarctica" className="blk ml-4" onChange={(e)=>setSubregion(e.target.value)}>
                          <option>Choose Region</option>
                          <option value="Antarctica">Antarctica</option>
                        </select>
                      </div>}
                      {continent==="Antarctica" && subregion==="Antarctica" && <div>
                        <label htmlFor="Country">Country</label>
                        <select id="Country" name="Country" className="blk ml-4" onChange={(e)=>setCountry(e.target.value)}>
                          <option>Choose Country</option>
                          <option value="Antarctica">Antarctica</option>
                        </select>
                      </div>}
                    </>

                    
                    <button onClick={handleCreate} className='bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg'>Create</button>
                </form>
            </div>
            <Footer/>
        </div>
      </div>

    )
  }
  
  export default CreatePost