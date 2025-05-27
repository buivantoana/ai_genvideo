import axios from "axios";
import { url_voice } from "../config";

export async function getVideo(url:String) {
  try {
    const response = await axios.post(`${url_voice}/transvideo/getvideo?video_url=${url}`, {}, {
      headers: {
        Authorization: "Bearer dHRzb3BlbmFpeGluY2hhb2NhY2JhbmdtdjEyMzQ1Ng==",
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
  }
}
export async function translateVideo(body:any) {
  try {
    const response = await axios.post(
      `${url_voice}/transvideo/process`,body,
      {
        headers: {
          Authorization: "Bearer dHRzb3BlbmFpeGluY2hhb2NhY2JhbmdtdjEyMzQ1Ng==",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
  }
}
export async function historyPayment({ user_id }: any) {
  try {
    const response = await axios.get(
      `${url_voice}/payment/history/${user_id}`,
      {
        headers: {
          Authorization: "Bearer dHRzb3BlbmFpeGluY2hhb2NhY2JhbmdtdjEyMzQ1Ng==",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
  }
}
