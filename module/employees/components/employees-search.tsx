import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search } from "lucide-react";

interface EmployeesSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function EmployeesSearch({ value, onChange }: EmployeesSearchProps) {
  return (
    <InputGroup className="max-w-sm">
      <InputGroupAddon>
        <Search className="size-4" />
      </InputGroupAddon>
      <InputGroupInput
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search by name, contact or email"
      />
    </InputGroup>
  );
}
