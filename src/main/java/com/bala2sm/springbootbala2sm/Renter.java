package com.bala2sm.springbootbala2sm;

public class Renter {
	 	private String name;
	    private String address;
	    private String contactNumber;
	    private String emailAddress;
	    private String driversLicenseNumber;

	    public Renter(String name, String address, String contactNumber, String emailAddress, String driversLicenseNumber) {
	        this.name = name;
	        this.address = address;
	        this.contactNumber = contactNumber;
	        this.emailAddress = emailAddress;
	        this.driversLicenseNumber = driversLicenseNumber;
	    }

		/**
		 * @return the name
		 */
		public String getName() {
			return name;
		}

		/**
		 * @param name the name to set
		 */
		public void setName(String name) {
			this.name = name;
		}

		/**
		 * @return the address
		 */
		public String getAddress() {
			return address;
		}

		/**
		 * @param address the address to set
		 */
		public void setAddress(String address) {
			this.address = address;
		}

		/**
		 * @return the contactNumber
		 */
		public String getContactNumber() {
			return contactNumber;
		}

		/**
		 * @param contactNumber the contactNumber to set
		 */
		public void setContactNumber(String contactNumber) {
			this.contactNumber = contactNumber;
		}

		/**
		 * @return the emailAddress
		 */
		public String getEmailAddress() {
			return emailAddress;
		}

		/**
		 * @param emailAddress the emailAddress to set
		 */
		public void setEmailAddress(String emailAddress) {
			this.emailAddress = emailAddress;
		}

		/**
		 * @return the driversLicenseNumber
		 */
		public String getDriversLicenseNumber() {
			return driversLicenseNumber;
		}

		/**
		 * @param driversLicenseNumber the driversLicenseNumber to set
		 */
		public void setDriversLicenseNumber(String driversLicenseNumber) {
			this.driversLicenseNumber = driversLicenseNumber;
		}

		@Override
		public String toString() {
			return 		"Name: " + name + "\n" +
			           "Address: " + address + "\n" +
			           "Contact Number: " + contactNumber + "\n" +
			           "Email Address: " + emailAddress + "\n" +
			           "Driver's License Number: " + driversLicenseNumber + "\n";
		}
	    
}
