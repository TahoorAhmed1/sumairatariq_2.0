"use client";
import { Input } from "@/components/ui/input";
import { Checkbox } from "../ui/checkbox";
import { Textarea } from "../ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useForm } from "react-hook-form";
import { checkoutFormSchema, userFormSchema } from "../../validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { LoaderIcon } from "lucide-react";
import { notify } from "@/lib/notify";
import { useRouter } from "next/navigation";
import { API } from "@/services";
export const cities = [
  { label: "Islamabad", value: "Islamabad" },
  { label: "Ahmed Nager", value: "Ahmed Nager" },
  { label: "Ahmadpur East", value: "Ahmadpur East" },
  { label: "Ali Khan", value: "Ali Khan" },
  { label: "Alipur", value: "Alipur" },
  { label: "Arifwala", value: "Arifwala" },
  { label: "Attock", value: "Attock" },
  { label: "Bhera", value: "Bhera" },
  { label: "Bhalwal", value: "Bhalwal" },
  { label: "Bahawalnagar", value: "Bahawalnagar" },
  { label: "Bahawalpur", value: "Bahawalpur" },
  { label: "Bhakkar", value: "Bhakkar" },
  { label: "Burewala", value: "Burewala" },
  { label: "Chillianwala", value: "Chillianwala" },
  { label: "Chakwal", value: "Chakwal" },
  { label: "Chichawatni", value: "Chichawatni" },
  { label: "Chiniot", value: "Chiniot" },
  { label: "Chishtian", value: "Chishtian" },
  { label: "Daska", value: "Daska" },
  { label: "Darya Khan", value: "Darya Khan" },
  { label: "Dera Ghazi", value: "Dera Ghazi" },
  { label: "Dhaular", value: "Dhaular" },
  { label: "Dina", value: "Dina" },
  { label: "Dinga", value: "Dinga" },
  { label: "Dipalpur", value: "Dipalpur" },
  { label: "Faisalabad", value: "Faisalabad" },
  { label: "Fateh Jhang", value: "Fateh Jhang" },
  { label: "Ghakhar Mandi", value: "Ghakhar Mandi" },
  { label: "Gojra", value: "Gojra" },
  { label: "Gujranwala", value: "Gujranwala" },
  { label: "Gujrat", value: "Gujrat" },
  { label: "Gujar Khan", value: "Gujar Khan" },
  { label: "Hafizabad", value: "Hafizabad" },
  { label: "Haroonabad", value: "Haroonabad" },
  { label: "Hasilpur", value: "Hasilpur" },
  { label: "Haveli", value: "Haveli" },
  { label: "Lakha", value: "Lakha" },
  { label: "Jalalpur", value: "Jalalpur" },
  { label: "Jattan", value: "Jattan" },
  { label: "Jampur", value: "Jampur" },
  { label: "Jaranwala", value: "Jaranwala" },
  { label: "Jhang", value: "Jhang" },
  { label: "Jhelum", value: "Jhelum" },
  { label: "Kalabagh", value: "Kalabagh" },
  { label: "Karor Lal", value: "Karor Lal" },
  { label: "Kasur", value: "Kasur" },
  { label: "Kamalia", value: "Kamalia" },
  { label: "Kamoke", value: "Kamoke" },
  { label: "Khanewal", value: "Khanewal" },
  { label: "Khanpur", value: "Khanpur" },
  { label: "Kharian", value: "Kharian" },
  { label: "Khushab", value: "Khushab" },
  { label: "Kot Adu", value: "Kot Adu" },
  { label: "Jauharabad", value: "Jauharabad" },
  { label: "Lahore", value: "Lahore" },
  { label: "Lalamusa", value: "Lalamusa" },
  { label: "Layyah", value: "Layyah" },
  { label: "Liaquat Pur", value: "Liaquat Pur" },
  { label: "Lodhran", value: "Lodhran" },
  { label: "Malakwal", value: "Malakwal" },
  { label: "Mamoori", value: "Mamoori" },
  { label: "Mailsi", value: "Mailsi" },
  { label: "Mandi Bahauddin", value: "Mandi Bahauddin" },
  { label: "mian Channu", value: "mian Channu" },
  { label: "Mianwali", value: "Mianwali" },
  { label: "Multan", value: "Multan" },
  { label: "Murree", value: "Murree" },
  { label: "Muridke", value: "Muridke" },
  { label: "Mianwali Bangla", value: "Mianwali Bangla" },
  { label: "Muzaffargarh", value: "Muzaffargarh" },
  { label: "Narowal", value: "Narowal" },
  { label: "Okara", value: "Okara" },
  { label: "Renala Khurd", value: "Renala Khurd" },
  { label: "Pakpattan", value: "Pakpattan" },
  { label: "Pattoki", value: "Pattoki" },
  { label: "Pir Mahal", value: "Pir Mahal" },
  { label: "Qaimpur", value: "Qaimpur" },
  { label: "Qila Didar", value: "Qila Didar" },
  { label: "Rabwah", value: "Rabwah" },
  { label: "Raiwind", value: "Raiwind" },
  { label: "Rajanpur", value: "Rajanpur" },
  { label: "Rahim Yar", value: "Rahim Yar" },
  { label: "Rawalpindi", value: "Rawalpindi" },
  { label: "Sadiqabad", value: "Sadiqabad" },
  { label: "Safdarabad", value: "Safdarabad" },
  { label: "Sahiwal", value: "Sahiwal" },
  { label: "Sangla Hill", value: "Sangla Hill" },
  { label: "Sarai Alamgir", value: "Sarai Alamgir" },
  { label: "Sargodha", value: "Sargodha" },
  { label: "Shakargarh", value: "Shakargarh" },
  { label: "Sheikhupura", value: "Sheikhupura" },
  { label: "Sialkot", value: "Sialkot" },
  { label: "Sohawa", value: "Sohawa" },
  { label: "Soianwala", value: "Soianwala" },
  { label: "Siranwali", value: "Siranwali" },
  { label: "Talagang", value: "Talagang" },
  { label: "Taxila", value: "Taxila" },
  { label: "Toba Tek", value: "Toba Tek" },
  { label: "Vehari", value: "Vehari" },
  { label: "Wah Cantonment", value: "Wah Cantonment" },
  { label: "Wazirabad", value: "Wazirabad" },
  { label: "Badin", value: "Badin" },
  { label: "Bhirkan", value: "Bhirkan" },
  { label: "Rajo Khanani", value: "Rajo Khanani" },
  { label: "Chak", value: "Chak" },
  { label: "Dadu", value: "Dadu" },
  { label: "Digri", value: "Digri" },
  { label: "Diplo", value: "Diplo" },
  { label: "Dokri", value: "Dokri" },
  { label: "Ghotki", value: "Ghotki" },
  { label: "Haala", value: "Haala" },
  { label: "Hyderabad", value: "Hyderabad" },
  { label: "Islamkot", value: "Islamkot" },
  { label: "Jacobabad", value: "Jacobabad" },
  { label: "Jamshoro", value: "Jamshoro" },
  { label: "Jungshahi", value: "Jungshahi" },
  { label: "Kandhkot", value: "Kandhkot" },
  { label: "Kandiaro", value: "Kandiaro" },
  { label: "Karachi", value: "Karachi" },
  { label: "Kashmore", value: "Kashmore" },
  { label: "Keti Bandar", value: "Keti Bandar" },
  { label: "Khairpur", value: "Khairpur" },
  { label: "Kotri", value: "Kotri" },
  { label: "Larkana", value: "Larkana" },
  { label: "Matiari", value: "Matiari" },
  { label: "Mehar", value: "Mehar" },
  { label: "Mirpur Khas", value: "Mirpur Khas" },
  { label: "Mithani", value: "Mithani" },
  { label: "Mithi", value: "Mithi" },
  { label: "Mehrabpur", value: "Mehrabpur" },
  { label: "Moro", value: "Moro" },
  { label: "Nagarparkar", value: "Nagarparkar" },
  { label: "Naudero", value: "Naudero" },
  { label: "Naushahro Feroze", value: "Naushahro Feroze" },
  { label: "Naushara", value: "Naushara" },
  { label: "Nawabshah", value: "Nawabshah" },
  { label: "Nazimabad", value: "Nazimabad" },
  { label: "Qambar", value: "Qambar" },
  { label: "Qasimabad", value: "Qasimabad" },
  { label: "Ranipur", value: "Ranipur" },
  { label: "Ratodero", value: "Ratodero" },
  { label: "Rohri", value: "Rohri" },
  { label: "Sakrand", value: "Sakrand" },
  { label: "Sanghar", value: "Sanghar" },
  { label: "Shahbandar", value: "Shahbandar" },
  { label: "Shahdadkot", value: "Shahdadkot" },
  { label: "Shahdadpur", value: "Shahdadpur" },
  { label: "Shahpur Chakar", value: "Shahpur Chakar" },
  { label: "Shikarpaur", value: "Shikarpaur" },
  { label: "Sukkur", value: "Sukkur" },
  { label: "Tangwani", value: "Tangwani" },
  { label: "Tando Adam", value: "Tando Adam" },
  { label: "Tando Allahyar", value: "Tando Allahyar" },
  { label: "Tando Muhammad", value: "Tando Muhammad" },
  { label: "Thatta", value: "Thatta" },
  { label: "Umerkot", value: "Umerkot" },
  { label: "Warah", value: "Warah" },
  { label: "Abbottabad", value: "Abbottabad" },
  { label: "Adezai", value: "Adezai" },
  { label: "Alpuri", value: "Alpuri" },
  { label: "Akora Khattak", value: "Akora Khattak" },
  { label: "Ayubia", value: "Ayubia" },
  { label: "Banda Daud", value: "Banda Daud" },
  { label: "Bannu", value: "Bannu" },
  { label: "Batkhela", value: "Batkhela" },
  { label: "Battagram", value: "Battagram" },
  { label: "Birote", value: "Birote" },
  { label: "Chakdara", value: "Chakdara" },
  { label: "Charsadda", value: "Charsadda" },
  { label: "Chitral", value: "Chitral" },
  { label: "Daggar", value: "Daggar" },
  { label: "Dargai", value: "Dargai" },
  { label: "Darya Khan", value: "Darya Khan" },
  { label: "dera Ismail", value: "dera Ismail" },
  { label: "Doaba", value: "Doaba" },
  { label: "Dir", value: "Dir" },
  { label: "Drosh", value: "Drosh" },
  { label: "Hangu", value: "Hangu" },
  { label: "Haripur", value: "Haripur" },
  { label: "Karak", value: "Karak" },
  { label: "Kohat", value: "Kohat" },
  { label: "Kulachi", value: "Kulachi" },
  { label: "Lakki Marwat", value: "Lakki Marwat" },
  { label: "Latamber", value: "Latamber" },
  { label: "Madyan", value: "Madyan" },
  { label: "Mansehra", value: "Mansehra" },
  { label: "Mardan", value: "Mardan" },
  { label: "Mastuj", value: "Mastuj" },
  { label: "Mingora", value: "Mingora" },
  { label: "Nowshera", value: "Nowshera" },
  { label: "Paharpur", value: "Paharpur" },
  { label: "Pabbi", value: "Pabbi" },
  { label: "Peshawar", value: "Peshawar" },
  { label: "Saidu Sharif", value: "Saidu Sharif" },
  { label: "Shorkot", value: "Shorkot" },
  { label: "Shewa Adda", value: "Shewa Adda" },
  { label: "Swabi", value: "Swabi" },
  { label: "Swat", value: "Swat" },
  { label: "Tangi", value: "Tangi" },
  { label: "Tank", value: "Tank" },
  { label: "Thall", value: "Thall" },
  { label: "Timergara", value: "Timergara" },
  { label: "Tordher", value: "Tordher" },
  { label: "Awaran", value: "Awaran" },
  { label: "Barkhan", value: "Barkhan" },
  { label: "Chagai", value: "Chagai" },
  { label: "Dera Bugti", value: "Dera Bugti" },
  { label: "Gwadar", value: "Gwadar" },
  { label: "Harnai", value: "Harnai" },
  { label: "Jafarabad", value: "Jafarabad" },
  { label: "Jhal Magsi", value: "Jhal Magsi" },
  { label: "Kacchi", value: "Kacchi" },
  { label: "Kalat", value: "Kalat" },
  { label: "Kech", value: "Kech" },
  { label: "Kharan", value: "Kharan" },
  { label: "Khuzdar", value: "Khuzdar" },
  { label: "Killa Abdullah", value: "Killa Abdullah" },
  { label: "Killa Saifullah", value: "Killa Saifullah" },
  { label: "Kohlu", value: "Kohlu" },
  { label: "Lasbela", value: "Lasbela" },
  { label: "Lehri", value: "Lehri" },
  { label: "Loralai", value: "Loralai" },
  { label: "Mastung", value: "Mastung" },
  { label: "Musakhel", value: "Musakhel" },
  { label: "Nasirabad", value: "Nasirabad" },
  { label: "Nushki", value: "Nushki" },
  { label: "Panjgur", value: "Panjgur" },
  { label: "Pishin valley", value: "Pishin valley" },
  { label: "Quetta", value: "Quetta" },
  { label: "Sherani", value: "Sherani" },
  { label: "Sibi", value: "Sibi" },
  { label: "Sohbatpur", value: "Sohbatpur" },
  { label: "Washuk", value: "Washuk" },
  { label: "Zhob", value: "Zhob" },
  { label: "Ziarat", value: "Ziara" },
];

function AccountInfo({ user }) {
  const form = useForm({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      phone: "",
      email: "",
      display: "",
      firstname: "",
      lastname: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.setValue("phone", user.phoneNumber);
      form.setValue("email", user.email);
      form.setValue("display", user.name);
    }
  }, [user]);

  const isLoadingbutton = form.formState.isSubmitting;
  async function onSubmit(values) {
    const { display, firstname, lastname, phone, email } = values;

    let payload = {
      name: firstname + lastname,
      email,
      phoneNumber: phone,
    };
    try {
      let res = await API.updateCustomer(payload);
      let data = res.data;
      notify("success", data?.message);
      form.setValue("display", firstname + lastname);
    } catch (error) {
      if (error?.response?.data?.message) {
        return notify("error", error?.response?.data?.message);
      } else {
        notify("error", error?.message);
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" grid gap-4 lg:grid-cols-2 grid-cols-1"
      >
        <FormField
          control={form.control}
          name="firstname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                First Name <span className="text-red-600">*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} className="border-slate-300 py-4" />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Last Name <span className="text-red-600">*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} className="border-slate-300 py-4" />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <div className="col-span-full w-full">
          <FormField
            className=""
            control={form.control}
            name="display"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Display Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="border-slate-300 py-4 py-4"
                    readOnly
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        </div>
        <div className="col-span-full w-full">
          <FormField
            className=""
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Number <span className="text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} className="border-slate-300 py-4 py-4" />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        </div>
        <div className="col-span-full w-full">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Email address <span className="text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} className="border-slate-300 py-4" />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        </div>
        <button
          disabled={isLoadingbutton}
          type="submit"
          className="bg-[#DD3333] text-sm rounded-[4px] py-3 px-6 w-full text-white mt-5"
        >
          {isLoadingbutton ? (
            <LoaderIcon className="text-center w-5 h-5 mx-auto text-white animate-spin" />
          ) : (
            "Save changes"
          )}
        </button>
      </form>
    </Form>
  );
}

export default AccountInfo;
