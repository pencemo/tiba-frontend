import { usePorfile } from "@/Context/ProfileContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEditProfiel } from "@/hooks/QueryHooks/useUserService";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { HiArrowUpTray, HiMiniCheck } from "react-icons/hi2";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

function AdminSettings() {
  const { profile } = usePorfile();
  const { mutate, isPending } = useEditProfiel();
  const [editProfil, setEdtiProfile] = useState({});
  const [file, setFile] = useState(null);
  const [error, setError]=useState('')
  const [success, setSuccess]=useState(false)

  useEffect(() => {
    setEdtiProfile(profile);
  }, [profile]);

  const handelSubmit = () => {
    const formData = new FormData();
  
    // Append all fields from editProfil to formData
    for (const key in editProfil) {
      formData.append(key, editProfil[key]);
    }
  
    // Append the image file if it exists
    if (file) {
      formData.append('file', file);
    }
  
    // Send formData to the server
    mutate(formData, {
      onSuccess: (data) => {
        if(data.success){
          setSuccess(true)
          setError('')
        }else{
          setSuccess(false)
          setError(data.message)
        }
      },
    });
  };


  const url =
    file
    ? URL.createObjectURL(file)
    : editProfil.profileImg
    ? baseUrl+editProfil.profileImg
    : "https://preline.co/assets/img/160x160/img1.jpg";
  return (
    <div>
      
      <div className="max-w-4xl px-4 py-10 sm:px-6 lg:px-8 mx-auto ">
        {/* Card */}
        <div className="bg-background rounded-xl border shadow-xs p-4 sm:p-7">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-foreground">Profile</h2>
            <p className="text-sm text-muted-foreground">
              Manage your name, password and account settings.
            </p>
          </div>

          <div>
            {/* Grid */}
            <div className="sm:grid flex flex-col sm:grid-cols-12 gap-3 sm:gap-6 ">
              <div className="sm:col-span-3">
                <Label>Profile photo</Label>
              </div>
              {/* End Col */}

              <div className="sm:col-span-9">
                <div className="flex items-center gap-5">
                  <img
                    className="inline-block size-16 object-cover border rounded-full ring-2 ring-white dark:ring-zinc-600"
                    src={url}
                    alt="Avatar"
                  />
                  <div className="flex gap-x-2">
                    <div>
                      <label
                        htmlFor="file"
                        className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50"
                      >
                        <HiArrowUpTray />
                        Upload photo
                      </label>
                      <input
                        onChange={(e) => setFile(e.target.files[0])}
                        id="file"
                        accept="image/*"
                        className="sr-only"
                        type="file"
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* End Col */}

              <div className="sm:col-span-3">
                <Label htmlFor="name">Full name</Label>
              </div>
              {/* End Col */}

              <div className="sm:col-span-9">
                <Input
                  onChange={(e) =>
                    setEdtiProfile({ ...editProfil, name: e.target.value })
                  }
                  value={editProfil.name}
                  placeholder="Enter your full name"
                  id="name"
                />
              </div>
              {/* End Col */}

              <div className="sm:col-span-3">
                <Label htmlFor="email">Email</Label>
              </div>
              {/* End Col */}

              <div className="sm:col-span-9">
                <Input
                  value={editProfil.email}
                  readOnly
                  placeholder="Your Email"
                  id="email"
                  disabled
                />
              </div>
              {/* End Col */}
              <div className="sm:col-span-3">
                <Label htmlFor="password">Password</Label>
              </div>
              {/* End Col */}

              <div className="sm:col-span-9">
                <div className="space-y-2">
                  <Input
                    onChange={(e) =>
                      setEdtiProfile({
                        ...editProfil,
                        currentPassword: e.target.value,
                      })
                    }
                    placeholder="Current password"
                    id="password"
                  />
                  <Input
                    onChange={(e) =>
                      setEdtiProfile({
                        ...editProfil,
                        newPassword: e.target.value,
                      })
                    }
                    placeholder="New password"
                  />
                </div>
              </div>
              {/* End Col */}
            <div className="col-span-3"></div>
            <div className="col-span-9">
              {error&&<p className="text-sm text-red-500">{error}</p>}
            </div>
            </div>
            

            <div className="mt-5 flex justify-end gap-x-2">
              {/* <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50">
                Cancel
                </button> */}
              <Button onClick={handelSubmit}>
                {isPending ? (
                  <Loader2 className="animate-spin" />
                ) : success ?
                  <div className="flex gap-1 items-center"><HiMiniCheck />Profile updated</div>
                : (
                  "Save changes"
                )}
              </Button>
            </div>
          </div>
        </div>
        {/* End Card */}
      </div>
      {/* End Card Section */}
    </div>
  );
}

export default AdminSettings;
