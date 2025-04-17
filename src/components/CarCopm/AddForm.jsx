import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CloudUploadIcon, Delete02Icon } from "hugeicons-react"
import { useCarMutation } from "@/hooks/QueryHooks/useCars"
import { useToast } from "@/hooks/use-toast"
import { usePorfile } from "@/Context/ProfileContext"
import { carCategory, carSpecs } from "@/Utils/ArrayList"
import { Loader2 } from "lucide-react"
import { Separator } from "../ui/separator"
import { useNavigate } from "react-router-dom"
import { HiMiniArrowLeft } from "react-icons/hi2"
import { MultiSelect } from "./MultiSelect"

export default function CarUploadForm() {
  const [images, setImages] = useState([])
  const navigate = useNavigate()
  const {toast} = useToast()
  const {profile}=usePorfile()
  const [errors, setErrors] = useState('')
  const [selected, setSelected] = useState([])

  const {mutate, isPending} = useCarMutation()
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    color: '',
    mileage: '',
    transmission: 'automatic', // Set default transmission
    fuel_type: '',
    seats: '',
    daily_rate: '',
    showroomId: '',
    weekly_rate: '',
    monthly_rate: '',
    available: true,
    category: '',
    type: '',
    addOnCharge: '',
    features: []
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleImageChange = (e) => {
    e.preventDefault();
    
    if (e.target.files.length > 4) {
      toast({
        title: "Limit Exceeded",
        description: "You can only upload 4 images at a time",
      });
      return;
    }
  
    // Create an array to store valid images
    const validImages = [];
  
    // Loop through selected files to check their size
    Array.from(e.target.files).forEach((file) => {
      if (file.size > 1 * 1024 * 1024) {  // 1 MB in bytes
        toast({
          title: "File Too Large",
          description: `${file.name} is too large. Maximum file size is 1 MB.`,
        });
      } else {
        validImages.push(file);
      }
    });
  
    // If there are valid images, update the state
    if (validImages.length > 0) {
      setImages(validImages);
    }
  };
  
  const handleRadioChange = (value) => {
    setFormData({ ...formData, transmission: value })
  }

  useEffect(()=>{
    setFormData({...formData, showroomId: profile?.showroomId})
  }, [profile])

  const handleSubmit = (e) => {
    e.preventDefault()
    
    setErrors('')
    
    
    if(formData.make === '' || formData.showroomId == "" || formData.model === '' || formData.year === ''  || formData.fuel_type === '' || formData.daily_rate === '' ){
        return setErrors('Please fill all required fields')
    }

     // Create a new FormData object
     const formDataToSend = new FormData();
     selected.forEach((item) => {
       formDataToSend.append('features', item);
     })
    
     // Append form data
     Object.keys(formData).forEach(key => {
       formDataToSend.append(key, formData[key]);
     });
 
     // Append the images (multiple files)
     images.forEach((image) => {
         formDataToSend.append('files', image);
     });
    mutate(formDataToSend, {
      onSuccess: (data) => { 
        if(data.success){
          toast({
            title: "Success",
            description: "Car added successfully",
          });
          handleCancel()
        }else{
          toast({
            title: "Error",
            description: data.message,
          });
          setErrors(data.message)
        }
      }
    })
    
  }

  const handleCancel = () => {
    setImages([])
    setSelected([])
    setFormData({
      make: '',
      model: '',
      year: '',
      color: '',
      mileage: '',
      transmission: 'automatic', // Set default transmission
      fuel_type: '',
      seats: '',
      daily_rate: '',
      weekly_rate: '',
      monthly_rate: '',
      showroomId: '',
      images: [], // This will hold the file names
      available: true,
      category: '',
      type: ''
    })
  }

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index))
  }
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 20 }, (_, i) => currentYear - i)

  return (
    <Card className="w-full max-w-3xl mx-auto md:p-2">
      <CardHeader>
        <div className="flex justify-between">
          <div>
            
        <CardTitle className='max-md:text-lg'>Upload Car Details</CardTitle>
        <CardDescription>
          Please fill in the details of the car you want to add.
        </CardDescription>
          </div>
          <div>
            <button className="flex text-sm items-center gap-1" onClick={()=>navigate(-1)}><HiMiniArrowLeft />Back</button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          
            <div className="flex items-center justify-center w-full">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <CloudUploadIcon size={30} strokeWidth={1} className="text-gray-400" />
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">JPEG, PNG, JPG or GIF (MAX. 1 MB)</p>
                    </div>
                    <input id="dropzone-file" type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden" />
                </label>
            </div> 


          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="make">Make</Label>
              <Input
                id="make"
                value={formData.make}
                onChange={handleInputChange}
                name="make"
                placeholder="e.g. Toyota"
                className={errors && formData.make == ''? 'border-red-500' : ''}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="model">Model</Label>
              <Input
                id="model"
                value={formData.model}
                onChange={handleInputChange}
                name="model"
                placeholder="e.g. Corolla"
                className={errors && formData.model == ''? 'border-red-500' : ''}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            
            <div className="space-y-2">
              <Label htmlFor="color">Color</Label>
              <Input
                id="color"
                value={formData.color}
                onChange={handleInputChange}
                name="color"
                placeholder="e.g. Red"
              />
            </div>
            <div className="space-y-2">
              <Label>Transmission</Label>
              <RadioGroup className='flex gap-5' value={formData.transmission} onValueChange={handleRadioChange}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="manual" id="manual" />
                  <Label htmlFor="manual">Manual</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="automatic" id="automatic" />
                  <Label htmlFor="automatic">Automatic</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="mileage">Mileage</Label>
              <Input
                id="mileage"
                value={formData.mileage}
                onChange={handleInputChange}
                name="mileage"
                type="number"
                placeholder="e.g. 50000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="seats">Number of Seats</Label>
              <Input
                id="seats"
                value={formData.seats}
                onChange={handleInputChange}
                name="seats"
                type="number"
                placeholder="e.g. 5"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select name="type" value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger >
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Basic">Basic Car</SelectItem>
                  <SelectItem value="Middle-Class">Middle-Class Car</SelectItem>
                  <SelectItem value="Premium">Premium Car</SelectItem>
                  <SelectItem value="Luxury">Luxury Cars</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fuel-type">Fuel Type</Label>
              <Select name="fuel_type" value={formData.fuel_type} onValueChange={(value) => setFormData({ ...formData, fuel_type: value })}>
                <SelectTrigger className={errors && formData.fuel_type == ''? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select fuel type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="petrol">Petrol</SelectItem>
                  <SelectItem value="diesel">Diesel</SelectItem>
                  <SelectItem value="electric">Electric</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select name="category" value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger className={errors && formData.category == ''? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {carCategory.map((category) =>{
                    return <SelectItem key={category} value={category}>{category}</SelectItem>
                  })}
                  
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Select name="year" value={formData.year} onValueChange={(value) => setFormData({ ...formData, year: value })}  >
                <SelectTrigger className={errors && formData.year == ''? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
          </div>


          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="addOnCharge">Add on charge /km</Label>
              <Input
                id="addOnCharge"
                value={formData.addOnCharge}
                onChange={handleInputChange}
                name="addOnCharge"
                type="number"
                placeholder="per km"
              />
            </div>
            <div className="space-y-2">
            <Label htmlFor="features">Features</Label>
            <MultiSelect options={carSpecs} selected={selected} onChange={setSelected} placeholder="Select car features" />
            </div>
            
          </div>

          <div className="grid md:grid-cols-2 gap-4">
          
            
          </div>
          <Separator className="my-20" />
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="daily-rate">Daily Rate</Label>
              <Input
                id="daily-rate"
                value={formData.daily_rate}
                onChange={handleInputChange}
                name="daily_rate"
                type="number"
                placeholder="per AED"
                className={errors && formData.daily_rate == ''? 'border-red-500' : ''}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weekly_rate">Weekly Rate</Label>
              <Input
                id="weekly_rate"
                value={formData.weekly_rate}
                onChange={handleInputChange}
                name="weekly_rate"
                type="number"
                placeholder="per AED"
                className={errors && formData.weekly_rate == ''? 'border-red-500' : ''}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="monthly_rate">Monthly Rate</Label>
              <Input
                id="monthly_rate"
                value={formData.monthly_rate}
                onChange={handleInputChange}
                name="monthly_rate"
                type="number"
                placeholder="per AED"
                className={errors && formData.monthly_rate == ''? 'border-red-500' : ''}
              />
            </div>
            
            
          </div>

          {images.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-medium mb-2">Selected Images:</p>
              <div className="flex w-full gap-3 flex-wrap">
                {images.map((image, index) => (
                  <div key={index} className="w-32 h-20 relative">
                    <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 rounded-md grid place-content-center">
                      <Delete02Icon className="bg-white rounded-full p-1 cursor-pointer" onClick={() => handleRemoveImage(index)} />
                    </div>
                    <img className="w-full h-full border object-cover rounded-md" key={index} src={URL.createObjectURL(image)} alt="" />
                  </div>
                ))}
              </div>
            </div>
          )}
          {errors && <p className="text-sm text-center text-red-500">{errors}</p>}
          <Button type="submit" className="w-full">
            {isPending ? <Loader2 className="animate-spin" /> : "Upload Car Details"}
          </Button>
        </form>
      </CardContent>
    </Card>
    
  )
}


