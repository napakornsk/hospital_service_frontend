import React, { useEffect, useState } from "react";
import type {
  BaseResponse,
  HospitalResponse,
  CreateStaffRequest,
  CreateStaffResponse,
  LoginStaffRequest,
  LoginStaffResponse,
  SearchPatientRequest,
  PatientResponse,
} from "./types";

const API_BASE = import.meta.env.VITE_API_URL || "";
const API = `${API_BASE}/api/v1`;

interface DummyPatient {
  hospital_id: string;
  patient_hn: string;
  first_name_th: string;
  middle_name_th: string;
  last_name_th: string;
  first_name_en: string;
  middle_name_en: string;
  last_name_en: string;
  date_of_birth: string;
  national_id: string;
  passport_id: string;
  phone_number: string;
  email: string;
  gender: string;
}

const DUMMY_PATIENTS: DummyPatient[] = [
  { hospital_id: "HC001", patient_hn: "HN100023", first_name_th: "อารยา", middle_name_th: "", last_name_th: "ฤทธิ์", first_name_en: "Araya", middle_name_en: "", last_name_en: "Rit", date_of_birth: "1986-12-02", national_id: "1101234567912", passport_id: "", phone_number: "0833445566", email: "araya.r@email.com", gender: "F" },
  { hospital_id: "HC001", patient_hn: "HN100001", first_name_th: "สมชาย", middle_name_th: "", last_name_th: "ใจดี", first_name_en: "Somchai", middle_name_en: "", last_name_en: "Jaidee", date_of_birth: "1985-04-12", national_id: "1101234567890", passport_id: "", phone_number: "0812345678", email: "somchai.j@email.com", gender: "M" },
  { hospital_id: "HC001", patient_hn: "HN100045", first_name_th: "อุมาพร", middle_name_th: "", last_name_th: "เพชร", first_name_en: "Umaporn", middle_name_en: "", last_name_en: "Petch", date_of_birth: "1980-01-31", national_id: "1101234567934", passport_id: "", phone_number: "0875566778", email: "umaporn.p@email.com", gender: "F" },
  { hospital_id: "HC001", patient_hn: "HN100034", first_name_th: "เกรียงไกร", middle_name_th: "", last_name_th: "วิทย์", first_name_en: "Kriangkrai", middle_name_en: "", last_name_en: "Wit", date_of_birth: "1982-12-19", national_id: "1101234567923", passport_id: "", phone_number: "0854455667", email: "kriangkrai.w@email.com", gender: "M" },
  { hospital_id: "HC001", patient_hn: "HN100012", first_name_th: "กฤษดา", middle_name_th: "ศักดิ์", last_name_th: "พานิช", first_name_en: "Krissada", middle_name_en: "Sak", last_name_en: "Panich", date_of_birth: "1980-04-04", national_id: "1101234567901", passport_id: "", phone_number: "0810101010", email: "krissada.p@email.com", gender: "M" },
  { hospital_id: "HC002", patient_hn: "HN100024", first_name_th: "ชัยยุทธ", middle_name_th: "", last_name_th: "พล", first_name_en: "Chaiyut", middle_name_en: "", last_name_en: "Pol", date_of_birth: "1972-01-15", national_id: "1101234567913", passport_id: "", phone_number: "0844556677", email: "chaiyut.p@email.com", gender: "M" },
  { hospital_id: "HC002", patient_hn: "HN100035", first_name_th: "จันทิมา", middle_name_th: "", last_name_th: "อรุณ", first_name_en: "Jantima", middle_name_en: "", last_name_en: "Arun", date_of_birth: "1995-07-07", national_id: "1101234567924", passport_id: "", phone_number: "0865566778", email: "jantima.a@email.com", gender: "F" },
  { hospital_id: "HC002", patient_hn: "HN100002", first_name_th: "สมหญิง", middle_name_th: "", last_name_th: "รักไทย", first_name_en: "Somying", middle_name_en: "", last_name_en: "Rakthai", date_of_birth: "1990-08-23", national_id: "1101234567891", passport_id: "", phone_number: "0898765432", email: "somying.r@email.com", gender: "F" },
  { hospital_id: "HC002", patient_hn: "HN100013", first_name_th: "รัตนา", middle_name_th: "", last_name_th: "ทองคำ", first_name_en: "Rattana", middle_name_en: "", last_name_en: "Thongkam", date_of_birth: "1970-12-30", national_id: "1101234567902", passport_id: "", phone_number: "0820202020", email: "rattana.t@email.com", gender: "F" },
  { hospital_id: "HC002", patient_hn: "HN100046", first_name_th: "กิตติศักดิ์", middle_name_th: "", last_name_th: "ชัย", first_name_en: "Kittisak", middle_name_en: "", last_name_en: "Chai", date_of_birth: "1973-05-17", national_id: "1101234567935", passport_id: "", phone_number: "0886677889", email: "kittisak.c@email.com", gender: "M" },
  { hospital_id: "HC003", patient_hn: "HN100025", first_name_th: "วาสนา", middle_name_th: "", last_name_th: "ดี", first_name_en: "Wassana", middle_name_en: "", last_name_en: "Dee", date_of_birth: "1996-06-20", national_id: "1101234567914", passport_id: "", phone_number: "0855667788", email: "wassana.d@email.com", gender: "F" },
  { hospital_id: "HC003", patient_hn: "HN100047", first_name_th: "ชลธิดา", middle_name_th: "", last_name_th: "อุดม", first_name_en: "Chontida", middle_name_en: "", last_name_en: "Udom", date_of_birth: "1994-12-04", national_id: "1101234567936", passport_id: "", phone_number: "0897788990", email: "chontida.u@email.com", gender: "F" },
  { hospital_id: "HC003", patient_hn: "HN100014", first_name_th: "ธนพล", middle_name_th: "", last_name_th: "ศิริ", first_name_en: "Thanapon", middle_name_en: "", last_name_en: "Siri", date_of_birth: "1993-06-18", national_id: "1101234567903", passport_id: "B11223344", phone_number: "0830303030", email: "thanapon.s@email.com", gender: "M" },
  { hospital_id: "HC003", patient_hn: "HN100003", first_name_th: "มานะ", middle_name_th: "มุ่งมั่น", last_name_th: "อดทน", first_name_en: "Mana", middle_name_en: "Mungman", last_name_en: "Odton", date_of_birth: "1978-11-05", national_id: "1101234567892", passport_id: "", phone_number: "0811112222", email: "mana.o@email.com", gender: "M" },
  { hospital_id: "HC003", patient_hn: "HN100036", first_name_th: "บุญชัย", middle_name_th: "", last_name_th: "เกียรติ", first_name_en: "Boonchai", middle_name_en: "", last_name_en: "Kiat", date_of_birth: "1969-01-28", national_id: "1101234567925", passport_id: "", phone_number: "0876677889", email: "boonchai.k@email.com", gender: "M" },
  { hospital_id: "HC004", patient_hn: "HN100015", first_name_th: "จิราพร", middle_name_th: "", last_name_th: "พิทักษ์", first_name_en: "Jiraporn", middle_name_en: "", last_name_en: "Pitak", date_of_birth: "1989-11-21", national_id: "1101234567904", passport_id: "", phone_number: "0840404040", email: "jiraporn.p@email.com", gender: "F" },
  { hospital_id: "HC004", patient_hn: "HN100037", first_name_th: "อัญชลี", middle_name_th: "", last_name_th: "กุล", first_name_en: "Anchalee", middle_name_en: "", last_name_en: "Kun", date_of_birth: "1986-04-16", national_id: "1101234567926", passport_id: "F11122233", phone_number: "0887788990", email: "anchalee.k@email.com", gender: "F" },
  { hospital_id: "HC004", patient_hn: "HN100026", first_name_th: "นพดล", middle_name_th: "", last_name_th: "ทรัพย์", first_name_en: "Noppadol", middle_name_en: "", last_name_en: "Sap", date_of_birth: "1983-04-10", national_id: "1101234567915", passport_id: "D12312312", phone_number: "0866778899", email: "noppadol.s@email.com", gender: "M" },
  { hospital_id: "HC004", patient_hn: "HN100048", first_name_th: "วรวุฒิ", middle_name_th: "", last_name_th: "สิน", first_name_en: "Worawut", middle_name_en: "", last_name_en: "Sin", date_of_birth: "1985-07-21", national_id: "1101234567937", passport_id: "H55566677", phone_number: "0818899001", email: "worawut.s@email.com", gender: "M" },
  { hospital_id: "HC004", patient_hn: "HN100004", first_name_th: "ปิติ", middle_name_th: "", last_name_th: "ปรีดา", first_name_en: "Piti", middle_name_en: "", last_name_en: "Preeda", date_of_birth: "1995-02-14", national_id: "1101234567893", passport_id: "", phone_number: "0822223333", email: "piti.p@email.com", gender: "M" },
  { hospital_id: "HC005", patient_hn: "HN100016", first_name_th: "เอกราช", middle_name_th: "", last_name_th: "สิงห์", first_name_en: "Ekarat", middle_name_en: "", last_name_en: "Sing", date_of_birth: "1984-02-28", national_id: "1101234567905", passport_id: "", phone_number: "0850505050", email: "ekarat.s@email.com", gender: "M" },
  { hospital_id: "HC005", patient_hn: "HN100027", first_name_th: "รุ่งทิวา", middle_name_th: "", last_name_th: "นพ", first_name_en: "Rungtiwa", middle_name_en: "", last_name_en: "Nop", date_of_birth: "1990-09-09", national_id: "1101234567916", passport_id: "", phone_number: "0877889900", email: "rungtiwa.n@email.com", gender: "F" },
  { hospital_id: "HC005", patient_hn: "HN100049", first_name_th: "ศศิธร", middle_name_th: "", last_name_th: "โชค", first_name_en: "Sasithorn", middle_name_en: "", last_name_en: "Chok", date_of_birth: "1988-02-15", national_id: "1101234567938", passport_id: "", phone_number: "0829900112", email: "sasithorn.c@email.com", gender: "F" },
  { hospital_id: "HC005", patient_hn: "HN100038", first_name_th: "วิทวัส", middle_name_th: "", last_name_th: "เจริญ", first_name_en: "Witawat", middle_name_en: "", last_name_en: "Charoen", date_of_birth: "1992-09-02", national_id: "1101234567927", passport_id: "", phone_number: "0898899001", email: "witawat.c@email.com", gender: "M" },
  { hospital_id: "HC005", patient_hn: "HN100005", first_name_th: "ชูใจ", middle_name_th: "", last_name_th: "ยินดี", first_name_en: "Chujai", middle_name_en: "", last_name_en: "Yindee", date_of_birth: "2001-09-30", national_id: "1101234567894", passport_id: "A12345678", phone_number: "0833334444", email: "chujai.y@email.com", gender: "F" },
  { hospital_id: "HC006", patient_hn: "HN100050", first_name_th: "อรรถพล", middle_name_th: "", last_name_th: "ทรัพย์", first_name_en: "Attapon", middle_name_en: "", last_name_en: "Sap", date_of_birth: "1990-11-08", national_id: "1101234567939", passport_id: "", phone_number: "0830011223", email: "attapon.s@email.com", gender: "M" },
  { hospital_id: "HC006", patient_hn: "HN100006", first_name_th: "ณัฐวุฒิ", middle_name_th: "", last_name_th: "ประเสริฐ", first_name_en: "Nattawut", middle_name_en: "", last_name_en: "Prasert", date_of_birth: "1988-12-11", national_id: "1101234567895", passport_id: "", phone_number: "0844445555", email: "nattawut.p@email.com", gender: "M" },
  { hospital_id: "HC006", patient_hn: "HN100017", first_name_th: "นันทนา", middle_name_th: "ใจ", last_name_th: "สว่าง", first_name_en: "Nantana", middle_name_en: "Jai", last_name_en: "Sawang", date_of_birth: "1991-08-08", national_id: "1101234567906", passport_id: "", phone_number: "0860606060", email: "nantana.s@email.com", gender: "F" },
  { hospital_id: "HC006", patient_hn: "HN100028", first_name_th: "ธีรยุทธ", middle_name_th: "", last_name_th: "ก้อง", first_name_en: "Teerayut", middle_name_en: "", last_name_en: "Kong", date_of_birth: "1979-02-18", national_id: "1101234567917", passport_id: "", phone_number: "0888990011", email: "teerayut.k@email.com", gender: "M" },
  { hospital_id: "HC006", patient_hn: "HN100039", first_name_th: "ดวงใจ", middle_name_th: "", last_name_th: "บริสุทธิ์", first_name_en: "Duangjai", middle_name_en: "", last_name_en: "Borisut", date_of_birth: "1977-11-11", national_id: "1101234567928", passport_id: "", phone_number: "0819900112", email: "duangjai.b@email.com", gender: "F" },
  { hospital_id: "HC007", patient_hn: "HN100007", first_name_th: "กนกวรรณ", middle_name_th: "", last_name_th: "สมบูรณ์", first_name_en: "Kanokwan", middle_name_en: "", last_name_en: "Somboon", date_of_birth: "1992-07-25", national_id: "1101234567896", passport_id: "AA9876543", phone_number: "0855556666", email: "kanokwan.s@email.com", gender: "F" },
  { hospital_id: "HC007", patient_hn: "HN100018", first_name_th: "ทวีศักดิ์", middle_name_th: "", last_name_th: "รุ่งเรือง", first_name_en: "Taweesak", middle_name_en: "", last_name_en: "Rungruang", date_of_birth: "1968-09-12", national_id: "1101234567907", passport_id: "", phone_number: "0870707070", email: "taweesak.r@email.com", gender: "M" },
  { hospital_id: "HC007", patient_hn: "HN100040", first_name_th: "จักรพงษ์", middle_name_th: "", last_name_th: "ยอด", first_name_en: "Jakkapong", middle_name_en: "", last_name_en: "Yod", date_of_birth: "1983-02-05", national_id: "1101234567929", passport_id: "", phone_number: "0820011223", email: "jakkapong.y@email.com", gender: "M" },
  { hospital_id: "HC007", patient_hn: "HN100029", first_name_th: "มยุรี", middle_name_th: "", last_name_th: "ศรี", first_name_en: "Mayuree", middle_name_en: "", last_name_en: "Sri", date_of_birth: "1985-11-25", national_id: "1101234567918", passport_id: "", phone_number: "0899001122", email: "mayuree.s@email.com", gender: "F" },
  { hospital_id: "HC008", patient_hn: "HN100030", first_name_th: "ประพันธ์", middle_name_th: "", last_name_th: "วงศ์", first_name_en: "Prapan", middle_name_en: "", last_name_en: "Wong", date_of_birth: "1962-08-14", national_id: "1101234567919", passport_id: "", phone_number: "0810011223", email: "prapan.w@email.com", gender: "M" },
  { hospital_id: "HC008", patient_hn: "HN100019", first_name_th: "ศิริวรรณ", middle_name_th: "", last_name_th: "แสงทอง", first_name_en: "Siriwan", middle_name_en: "", last_name_en: "Sangthong", date_of_birth: "1976-03-03", national_id: "1101234567908", passport_id: "", phone_number: "0880808080", email: "siriwan.s@email.com", gender: "F" },
  { hospital_id: "HC008", patient_hn: "HN100041", first_name_th: "พรเพ็ญ", middle_name_th: "", last_name_th: "จันทร์", first_name_en: "Pornpen", middle_name_en: "", last_name_en: "Jan", date_of_birth: "1989-06-24", national_id: "1101234567930", passport_id: "", phone_number: "0831122334", email: "pornpen.j@email.com", gender: "F" },
  { hospital_id: "HC008", patient_hn: "HN100008", first_name_th: "วิชัย", middle_name_th: "", last_name_th: "เจริญสุข", first_name_en: "Wichai", middle_name_en: "", last_name_en: "Charoensuk", date_of_birth: "1965-03-08", national_id: "1101234567897", passport_id: "", phone_number: "0866667777", email: "wichai.c@email.com", gender: "M" },
  { hospital_id: "HC009", patient_hn: "HN100009", first_name_th: "พรพรรณ", middle_name_th: "", last_name_th: "งามยิ่ง", first_name_en: "Pornpan", middle_name_en: "", last_name_en: "Ngamying", date_of_birth: "1982-10-19", national_id: "1101234567898", passport_id: "", phone_number: "0877778888", email: "pornpan.n@email.com", gender: "F" },
  { hospital_id: "HC009", patient_hn: "HN100020", first_name_th: "อนุชา", middle_name_th: "", last_name_th: "กิตติ", first_name_en: "Anucha", middle_name_en: "", last_name_en: "Kitti", date_of_birth: "1987-07-14", national_id: "1101234567909", passport_id: "", phone_number: "0890909090", email: "anucha.k@email.com", gender: "M" },
  { hospital_id: "HC009", patient_hn: "HN100031", first_name_th: "นิสา", middle_name_th: "", last_name_th: "ชล", first_name_en: "Nisa", middle_name_en: "", last_name_en: "Chon", date_of_birth: "1999-03-31", national_id: "1101234567920", passport_id: "E55443322", phone_number: "0821122334", email: "nisa.c@email.com", gender: "F" },
  { hospital_id: "HC009", patient_hn: "HN100042", first_name_th: "สุรชัย", middle_name_th: "", last_name_th: "สิทธิ", first_name_en: "Surachai", middle_name_en: "", last_name_en: "Sitti", date_of_birth: "1964-10-13", national_id: "1101234567931", passport_id: "", phone_number: "0842233445", email: "surachai.s@email.com", gender: "M" },
  { hospital_id: "HC010", patient_hn: "HN100032", first_name_th: "พิเชษฐ์", middle_name_th: "", last_name_th: "เดช", first_name_en: "Pichet", middle_name_en: "", last_name_en: "Dech", date_of_birth: "1974-05-22", national_id: "1101234567921", passport_id: "", phone_number: "0832233445", email: "pichet.d@email.com", gender: "M" },
  { hospital_id: "HC010", patient_hn: "HN100043", first_name_th: "นรีรัตน์", middle_name_th: "", last_name_th: "รัตน์", first_name_en: "Nareerat", middle_name_en: "", last_name_en: "Rat", date_of_birth: "1997-03-09", national_id: "1101234567932", passport_id: "G99988877", phone_number: "0853344556", email: "nareerat.r@email.com", gender: "F" },
  { hospital_id: "HC010", patient_hn: "HN100010", first_name_th: "อภิชาติ", middle_name_th: "", last_name_th: "บุญส่ง", first_name_en: "Apichart", middle_name_en: "", last_name_en: "Boonsong", date_of_birth: "1975-01-22", national_id: "1101234567899", passport_id: "", phone_number: "0888889999", email: "apichart.b@email.com", gender: "M" },
  { hospital_id: "HC010", patient_hn: "HN100021", first_name_th: "พัชรี", middle_name_th: "", last_name_th: "มณี", first_name_en: "Patcharee", middle_name_en: "", last_name_en: "Manee", date_of_birth: "1994-10-29", national_id: "1101234567910", passport_id: "C99887766", phone_number: "0811223344", email: "patcharee.m@email.com", gender: "F" },
  { hospital_id: "HC011", patient_hn: "HN100044", first_name_th: "พงศกร", middle_name_th: "", last_name_th: "ทิพย์", first_name_en: "Pongsakorn", middle_name_en: "", last_name_en: "Thip", date_of_birth: "1991-08-27", national_id: "1101234567933", passport_id: "", phone_number: "0864455667", email: "pongsakorn.t@email.com", gender: "M" },
  { hospital_id: "HC011", patient_hn: "HN100033", first_name_th: "สุชาดา", middle_name_th: "", last_name_th: "เทพ", first_name_en: "Suchada", middle_name_en: "", last_name_en: "Thep", date_of_birth: "1988-10-06", national_id: "1101234567922", passport_id: "", phone_number: "0843344556", email: "suchada.t@email.com", gender: "F" },
  { hospital_id: "HC011", patient_hn: "HN100022", first_name_th: "สุทธิพงษ์", middle_name_th: "", last_name_th: "วร", first_name_en: "Suttipong", middle_name_en: "", last_name_en: "Wor", date_of_birth: "1981-05-05", national_id: "1101234567911", passport_id: "", phone_number: "0822334455", email: "suttipong.w@email.com", gender: "M" },
  { hospital_id: "HC011", patient_hn: "HN100011", first_name_th: "สุภาภรณ์", middle_name_th: "", last_name_th: "วิเศษ", first_name_en: "Supaporn", middle_name_en: "", last_name_en: "Wiset", date_of_birth: "1998-05-16", national_id: "1101234567900", passport_id: "", phone_number: "0899990000", email: "supaporn.w@email.com", gender: "F" },
];

type ResultEntry =
  | BaseResponse<CreateStaffResponse>
  | BaseResponse<LoginStaffResponse>
  | BaseResponse<PatientResponse[]>
  | string;

function App() {
  const [token, setToken] = useState("");
  const [hospitals, setHospitals] = useState<HospitalResponse[]>([]);
  const [results, setResults] = useState<Record<string, ResultEntry>>({});

  useEffect(() => {
    fetch(`${API}/hospitals`)
      .then((res) => res.json())
      .then((data: BaseResponse<HospitalResponse[]>) => {
        if (!data.is_error && data.data) setHospitals(data.data);
      })
      .catch(() => { });
  }, []);

  async function request<T>(
    key: string,
    method: string,
    path: string,
    body?: object,
    auth?: boolean,
  ): Promise<BaseResponse<T> | undefined> {
    setResults((r) => ({ ...r, [key]: "Loading..." }));
    try {
      const headers: Record<string, string> = {};
      if (body) headers["Content-Type"] = "application/json";
      if (auth && token) headers["Authorization"] = `Bearer ${token}`;

      const res = await fetch(`${API}${path}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
      });
      const data: BaseResponse<T> = await res.json();
      setResults((r) => ({ ...r, [key]: data as ResultEntry }));
      return data;
    } catch (e) {
      const err: BaseResponse = { is_error: true, message: String(e) };
      setResults((r) => ({ ...r, [key]: err as ResultEntry }));
    }
  }

  function handleRegister(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const body: CreateStaffRequest = {
      hospital_id: fd.get("hospital_id") as string,
      username: fd.get("username") as string,
      password: fd.get("password") as string,
    };
    request<CreateStaffResponse>("register", "POST", "/staff/create", body);
  }

  async function handleLogin(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const body: LoginStaffRequest = {
      username: fd.get("username") as string,
      password: fd.get("password") as string,
    };
    const res = await request<LoginStaffResponse>("login", "POST", "/staff/login", body);
    if (!res?.is_error && res?.data?.access_token) {
      setToken(res.data.access_token);
    }
  }

  function handleSearch(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const params = new URLSearchParams();
    const fields: (keyof SearchPatientRequest)[] = [
      "national_id", "passport_id", "first_name", "middle_name",
      "last_name", "date_of_birth", "phone_number", "email",
    ];
    for (const field of fields) {
      const val = fd.get(field) as string;
      if (val) params.set(field, val);
    }
    request<PatientResponse[]>("search", "GET", `/patient/search?${params}`, undefined, true);
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>HIS - Hospital Information Service</h1>
      {token && (
        <div style={styles.tokenBadge}>
          Logged in (token: ...{token.slice(-20)})
        </div>
      )}
      <div style={styles.grid}>
        {/* Register */}
        <div style={styles.card}>
          <h2>Register Staff</h2>
          <p style={styles.method}>POST /staff/create</p>
          <form onSubmit={handleRegister} style={styles.form}>
            <select name="hospital_id" required style={styles.input} defaultValue="">
              <option value="" disabled>Select Hospital</option>
              {hospitals.map((h) => (
                <option key={h.hospital_id} value={h.hospital_id}>
                  [{h.hospital_id}] {h.name_en} ({h.name_th})
                </option>
              ))}
            </select>
            <input name="username" placeholder="Username (min 6)" required style={styles.input} />
            <input name="password" type="password" placeholder="Password (min 8)" required style={styles.input} />
            <button type="submit" style={styles.btn}>Register</button>
          </form>
          {"register" in results && <Result data={results.register} />}
        </div>

        {/* Login */}
        <div style={styles.card}>
          <h2>Login Staff</h2>
          <p style={styles.method}>POST /staff/login</p>
          <form onSubmit={handleLogin} style={styles.form}>
            <input name="username" placeholder="Username" required style={styles.input} />
            <input name="password" type="password" placeholder="Password" required style={styles.input} />
            <button type="submit" style={styles.btn}>Login</button>
          </form>
          {"login" in results && <Result data={results.login} />}
        </div>

        {/* Search */}
        <div style={styles.card}>
          <h2>Search Patient</h2>
          <p style={styles.method}>GET /patient/search</p>
          {!token && <p style={styles.warn}>Login first to get a token</p>}
          <form onSubmit={handleSearch} style={styles.form}>
            <input name="national_id" placeholder="National ID" style={styles.input} />
            <input name="passport_id" placeholder="Passport ID" style={styles.input} />
            <input name="first_name" placeholder="First Name" style={styles.input} />
            <input name="middle_name" placeholder="Middle Name" style={styles.input} />
            <input name="last_name" placeholder="Last Name" style={styles.input} />
            <input name="date_of_birth" placeholder="Date of Birth (YYYY-MM-DD)" style={styles.input} />
            <input name="phone_number" placeholder="Phone Number" style={styles.input} />
            <input name="email" placeholder="Email" style={styles.input} />
            <button type="submit" style={styles.btn} disabled={!token}>Search</button>
          </form>
          {"search" in results && <Result data={results.search} />}
        </div>
      </div>
      <PatientTable />
    </div>
  );
}

function PatientTable() {
  const cols: { key: keyof DummyPatient; label: string }[] = [
    { key: "hospital_id", label: "Hospital" },
    { key: "patient_hn", label: "HN" },
    { key: "first_name_th", label: "ชื่อ" },
    { key: "middle_name_th", label: "ชื่อกลาง" },
    { key: "last_name_th", label: "นามสกุล" },
    { key: "first_name_en", label: "First" },
    { key: "middle_name_en", label: "Middle" },
    { key: "last_name_en", label: "Last" },
    { key: "date_of_birth", label: "DOB" },
    { key: "national_id", label: "National ID" },
    { key: "passport_id", label: "Passport" },
    { key: "phone_number", label: "Phone" },
    { key: "email", label: "Email" },
    { key: "gender", label: "G" },
  ];

  return (
    <div style={styles.tableSection}>
      <div style={styles.tableHeader}>
        <h2 style={{ margin: 0 }}>Sample Patient Data</h2>
        <span style={styles.tableCount}>{DUMMY_PATIENTS.length} patients</span>
      </div>
      <p style={styles.tableNote}>
        Use these values to test the Search Patient form above.
        Hospital ID is shown as a prefix badge on each Hospital column cell.
      </p>
      <div style={styles.tableWrap}>
        <table style={styles.table}>
          <thead>
            <tr>
              {cols.map((c) => (
                <th key={c.key} style={styles.th}>{c.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DUMMY_PATIENTS.map((p, i) => (
              <tr key={i} style={i % 2 === 0 ? styles.trEven : styles.trOdd}>
                {cols.map((c) => {
                  const val = p[c.key];
                  if (c.key === "hospital_id") {
                    return (
                      <td key={c.key} style={styles.td}>
                        <span style={styles.hospitalBadge}>{val}</span>
                      </td>
                    );
                  }
                  if (c.key === "patient_hn") {
                    return (
                      <td key={c.key} style={styles.td}>
                        {val}
                      </td>
                    );
                  }
                  if (c.key === "gender") {
                    return (
                      <td key={c.key} style={styles.td}>
                        <span style={val === "F" ? styles.genderF : styles.genderM}>{val}</span>
                      </td>
                    );
                  }
                  return <td key={c.key} style={styles.td}>{val || <span style={styles.empty}>—</span>}</td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Result({ data }: { data: ResultEntry }) {
  if (typeof data === "string") {
    return <pre style={styles.result}>{data}</pre>;
  }
  return (
    <pre style={{
      ...styles.result,
      borderLeft: `3px solid ${data.is_error ? "#e74c3c" : "#2ecc71"}`,
    }}>
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: 24,
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  title: {
    textAlign: "center",
    marginBottom: 8,
  },
  tokenBadge: {
    textAlign: "center",
    padding: "8px 16px",
    background: "#d4edda",
    borderRadius: 6,
    marginBottom: 16,
    fontSize: 14,
    color: "#155724",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
    gap: 20,
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: 8,
    padding: 20,
    background: "#fafafa",
  },
  method: {
    fontSize: 13,
    color: "#666",
    fontFamily: "monospace",
    marginTop: -4,
    marginBottom: 12,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  input: {
    padding: "8px 12px",
    border: "1px solid #ccc",
    borderRadius: 4,
    fontSize: 14,
  },
  btn: {
    padding: "10px 16px",
    background: "#0070f3",
    color: "#fff",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 600,
  },
  warn: {
    color: "#856404",
    background: "#fff3cd",
    padding: "6px 12px",
    borderRadius: 4,
    fontSize: 13,
  },
  result: {
    marginTop: 12,
    padding: 12,
    background: "#1e1e1e",
    color: "#d4d4d4",
    borderRadius: 6,
    fontSize: 12,
    overflow: "auto",
    maxHeight: 300,
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
  },
  tableSection: {
    marginTop: 32,
    border: "1px solid #ddd",
    borderRadius: 8,
    padding: 20,
    background: "#fafafa",
  },
  tableHeader: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 4,
  },
  tableCount: {
    fontSize: 13,
    color: "#666",
    background: "#e9ecef",
    padding: "2px 10px",
    borderRadius: 12,
  },
  tableNote: {
    fontSize: 13,
    color: "#555",
    marginBottom: 12,
    marginTop: 4,
  },
  tableWrap: {
    overflowX: "auto" as const,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse" as const,
    fontSize: 13,
  },
  th: {
    textAlign: "left" as const,
    padding: "8px 10px",
    background: "#343a40",
    color: "#fff",
    whiteSpace: "nowrap" as const,
    position: "sticky" as const,
    top: 0,
  },
  td: {
    padding: "7px 10px",
    borderBottom: "1px solid #eee",
    whiteSpace: "nowrap" as const,
  },
  trEven: { background: "#fff" },
  trOdd: { background: "#f8f9fa" },
  hospitalBadge: {
    display: "inline-block",
    background: "#0070f3",
    color: "#fff",
    padding: "1px 8px",
    borderRadius: 10,
    fontSize: 11,
    fontWeight: 700,
    fontFamily: "monospace",
  },
  hnPrefix: {
    display: "inline-block",
    background: "#e0ecff",
    color: "#0070f3",
    padding: "1px 6px",
    borderRadius: 8,
    fontSize: 10,
    fontWeight: 700,
    fontFamily: "monospace",
  },
  genderF: {
    display: "inline-block",
    background: "#fde8f0",
    color: "#c0187c",
    padding: "1px 8px",
    borderRadius: 10,
    fontSize: 11,
    fontWeight: 700,
  },
  genderM: {
    display: "inline-block",
    background: "#dff0fd",
    color: "#0070a8",
    padding: "1px 8px",
    borderRadius: 10,
    fontSize: 11,
    fontWeight: 700,
  },
  empty: {
    color: "#bbb",
  },
};

export default App;
