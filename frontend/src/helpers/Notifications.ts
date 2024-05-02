import Notiflix, {
  Confirm,
  IConfirmOptions,
  IReportOptions,
  Loading,
  Report,
} from "notiflix";

interface INotificationDTO {
  type?: "success" | "warning" | "error";
  message: string;
  time?: number;
}

export function SendNotify({
  message,
  type = "success",
  time = 2000,
}: INotificationDTO) {
  switch (type) {
    case "warning":
      return Notiflix.Notify.info(message, {
        timeout: time,
        pauseOnHover: true,
      });
    case "error":
      return Notiflix.Notify.failure(message, {
        timeout: time,
        pauseOnHover: true,
      });
    case "success":
      return Notiflix.Notify.success(message, { timeout: 1500 });
  }
}

interface ISendReportDTO {
  type: "success" | "failure" | "error" | "warning";
  title: string;
  text?: string;
  btnTxt?: string;
  btnCallback?: () => void;
  option?: IReportOptions;
}

export function SendReport({
  option = {},
  title,
  type,
  btnCallback,
  btnTxt = "Ok",
  text = "",
}: ISendReportDTO) {
  if (!option || Object.keys(option).length == 0) {
    option = {
      plainText: false,
    };
  }

  switch (type) {
    case "success":
      Report.success(title, text, btnTxt, btnCallback, option);
      break;
    case "failure":
    case "error":
      Report.failure(title, text, btnTxt, btnCallback, option);
      break;
    case "warning":
      Report.warning(title, text, btnTxt, btnCallback, option);
      break;
    default:
      Report.info(title, text, btnTxt, btnCallback, option);
      break;
  }
}

interface ISendConfirmDTO {
  title: string;
  message: string;
  okButtonText: string;
  cancelButtonText?: string;
  okButtonCallback?: () => void;
  cancelButtonCallback?: () => void;
  options?: IConfirmOptions;
}

export function SendConfirm({
  message,
  okButtonText,
  title,
  cancelButtonCallback,
  cancelButtonText,
  okButtonCallback,
  options,
}: ISendConfirmDTO) {
  if (!options) {
    options = {
      buttonsFontSize: ".6875rem",
      okButtonBackground: "#FF0000",
      titleColor: "#FF0000",
      plainText: false,
      messageMaxLength: 300,
    };
  }

  Confirm.show(
    title,
    message,
    okButtonText,
    cancelButtonText,
    okButtonCallback,
    cancelButtonCallback,
    options
  );
}

export async function WaitToDisappear(time: number) {
  await new Promise((resolve) => setTimeout(resolve, time));

  return;
}

export function InitLoading() {
  Loading.circle("Aguarde...", {
    svgColor: "#0F8A03",
    svgSize: "40px",
  });
}

export function RemoveLoading() {
  Loading.remove()
}
