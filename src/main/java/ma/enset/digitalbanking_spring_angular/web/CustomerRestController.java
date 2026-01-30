package ma.enset.digitalbanking_spring_angular.web;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ma.enset.digitalbanking_spring_angular.dtos.AccountOperationDTO;
import ma.enset.digitalbanking_spring_angular.dtos.CustomerDTO;
import ma.enset.digitalbanking_spring_angular.entities.Customer;
import ma.enset.digitalbanking_spring_angular.exception.CustomerNotFoundException;
import ma.enset.digitalbanking_spring_angular.services.BankAccountService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@Slf4j
@CrossOrigin("*")
public class CustomerRestController {
    private BankAccountService bankAccountService;

    @GetMapping("/customers")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
    public List<CustomerDTO> customers() {
        return bankAccountService.listCustomers();
    }

    @GetMapping("/customers/{id}")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
    public CustomerDTO getCustomer(@PathVariable(name = "id") Long CustomerId) throws CustomerNotFoundException {
        return bankAccountService.getCustomer(CustomerId);
    }

    @PostMapping("/customers")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
    public CustomerDTO saveCustomer(@RequestBody CustomerDTO customer) {
        return bankAccountService.saveCustomerDTO(customer);
    }

    @PutMapping("/customers/{id}")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
    public CustomerDTO updateCustomer(@PathVariable Long id, @RequestBody CustomerDTO customerDTO) {
        customerDTO.setId(id);
        return bankAccountService.updateCustomer(customerDTO);
    }

    @DeleteMapping("/customers/{id}")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
    public void deleteCustomer(@PathVariable Long id) throws CustomerNotFoundException {
        bankAccountService.deleteCustomer(id);
    }

    @GetMapping("/customers/search")
    public List<CustomerDTO> searchCustomers(@RequestParam(name = "keyword", defaultValue = "") String keyword) {
        return bankAccountService.searchCustomers("%" + keyword + "%");
    }

    // Get customer by username (for authentication)
    @GetMapping("/customers/by-username/{username}")
    public CustomerDTO getCustomerByUsername(@PathVariable String username) {
        return bankAccountService.listCustomers().stream()
                .filter(c -> username.equals(c.getUsername()))
                .findFirst()
                .orElse(null);
    }

    // Get accounts for a specific customer
    @GetMapping("/customers/{customerId}/accounts")
    public List<ma.enset.digitalbanking_spring_angular.dtos.BankAccountDTO> getCustomerAccounts(
            @PathVariable Long customerId) {
        return bankAccountService.listBankAccounts().stream()
                .filter(account -> {
                    ma.enset.digitalbanking_spring_angular.dtos.CustomerDTO customer = null;
                    if (account instanceof ma.enset.digitalbanking_spring_angular.dtos.CurrentBankAccountDTO) {
                        customer = ((ma.enset.digitalbanking_spring_angular.dtos.CurrentBankAccountDTO) account)
                                .getCustomerDTO();
                    } else if (account instanceof ma.enset.digitalbanking_spring_angular.dtos.SavingBankAccountDTO) {
                        customer = ((ma.enset.digitalbanking_spring_angular.dtos.SavingBankAccountDTO) account)
                                .getCustomerDTO();
                    }
                    return customer != null && customer.getId().equals(customerId);
                })
                .collect(java.util.stream.Collectors.toList());
    }
}
