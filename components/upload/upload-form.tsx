import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function UploadForm() {
  return (
    <form className="flex flex-col gap-6">
      <div className="flex justify-end items-center gap-1.5">
        <Input
          id="file"
          name="file"
          type="file"
          accept="audio/*,video/*"
          required
        />
        <Button className="bg-purple-600">Transcribe</Button>
      </div>
    </form>
  );
}
